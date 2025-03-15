import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { createTask } from "@/features/task/taskActions";
import { Task } from "@/interfaces/tasks";
import SecureStorage from "@/utils/SecureStorage";
interface Props {
  isOpen: any;
  setIsOpen: any;
  
}
const CreateTaskModal: React.FC<Props> = ({
  isOpen,
  setIsOpen,
  
}) => {

  const dispatch= useDispatch<AppDispatch>();
  const [formData, setFormData] = useState<Task>({
      title: "",
      priority: 1,
      description: "",
      status: "pending",
      dueDate: "",
      createdBy: "",
      createdByEmail: "",
      assignedTo: "",
      assignedToEmail: "",
    });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e:any) => {
    e.preventDefault()
    const decoded:any= SecureStorage.getItem('decoded')

    // setting dummy for now
    const updatedFormData= {...formData, 
      assignedToEmail: decoded?.email,
      assignedTo: decoded?.fullName,
      createdByEmail: decoded?.email,
      createdBy: decoded?.fullName,

    }
    setFormData(updatedFormData)
    dispatch(createTask(updatedFormData))
    console.log("Form submitted:", updatedFormData);
    setIsOpen(false);
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
        <form onSubmit={handleSubmit}>

          <DialogHeader>
            <DialogTitle>Create Task</DialogTitle>
          </DialogHeader>
          <Card>
            <CardContent>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Input
                    id="priority"
                    name="priority"
                    type="number"
                    value={formData.priority}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>
               
                <div>
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input
                    id="dueDate"
                    name="dueDate"
                    type="date"
                    value={formData.dueDate}
                    onChange={handleInputChange}
                  />
                </div>
               
                <div>
                  <Label htmlFor="assignedTo">Assigned To</Label>
                  <Input
                    id="assignedTo"
                    name="assignedTo"
                    required
                    value={formData.assignedTo}
                    onChange={handleInputChange}
                  />
                </div>
               
              </div>
            </CardContent>
          </Card>
          <DialogFooter>
            <Button type="submit">Create</Button>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>

          </DialogFooter>

        </form>
        </DialogContent>

      </Dialog>
      
    </div>
  );
};

export default CreateTaskModal;

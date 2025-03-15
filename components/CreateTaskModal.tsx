import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
interface Props {
  isOpen: any;
  setIsOpen: any;
  formData: any;
  setFormData: any;
}
const CreateTaskModal: React.FC<Props> = ({
  isOpen,
  setIsOpen,
  formData,
  setFormData,
}) => {

  const dispatch= useDispatch<AppDispatch>();
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    // setFormData(...formData, {

    // })
    // dispatch(createTask(formData))
    console.log("Form submitted:", formData);
    setIsOpen(false);
  };

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Open Form</Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
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
                    value={formData.assignedTo}
                    onChange={handleInputChange}
                  />
                </div>
               
              </div>
            </CardContent>
          </Card>
          <DialogFooter>
            <Button onClick={handleSubmit}>Create</Button>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateTaskModal;

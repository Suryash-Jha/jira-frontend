import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import SecureStorage from "@/utils/SecureStorage";
import { Project } from "@/interfaces/project";

interface Props {
  isOpen: any;
  setIsOpen: any;
}

const CreateProjectModal: React.FC<Props> = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState<Project>({
    organizationId: '',
    projectName: '',
    projectKey: '',
    projectDesc: '',
    projectAdmin: '',
    projectMembers: []
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const decoded: any = SecureStorage.getItem('decoded');
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="flex items-center justify-center bg-[#8a9bbd] bg-opacity-90 p-4">
        <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-3xl font-extrabold text-gray-800 mb-4">Create New Project</DialogTitle>
          </DialogHeader>
          <Card className="bg-[#f0f4f8] p-6 rounded-lg">
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="projectName" className="text-gray-700 font-semibold">Project Name</Label>
                <Input id="projectName" name="projectName" onChange={handleInputChange} required className="bg-white text-gray-900 border border-gray-300 rounded-md p-2 mt-1" />
              </div>
              <div>
                <Label htmlFor="projectKey" className="text-gray-700 font-semibold">Project Key</Label>
                <Input id="projectKey" name="projectKey" onChange={handleInputChange} required className="bg-white text-gray-900 border border-gray-300 rounded-md p-2 mt-1" />
              </div>
              <div>
                <Label htmlFor="projectDesc" className="text-gray-700 font-semibold">Description</Label>
                <Input id="projectDesc" name="projectDesc" onChange={handleInputChange} className="bg-white text-gray-900 border border-gray-300 rounded-md p-2 mt-1" />
              </div>
              <div>
                <Label htmlFor="dueDate" className="text-gray-700 font-semibold">Due Date</Label>
                <Input id="dueDate" name="dueDate" type="date" onChange={handleInputChange} className="bg-white text-gray-900 border border-gray-300 rounded-md p-2 mt-1" />
              </div>
              <div>
                <Label htmlFor="projectAdmin" className="text-gray-700 font-semibold">Project Admin</Label>
                <Input id="projectAdmin" name="projectAdmin" onChange={handleInputChange} required className="bg-white text-gray-900 border border-gray-300 rounded-md p-2 mt-1" />
              </div>
            </CardContent>
          </Card>
          <DialogFooter className="mt-6 flex justify-end space-x-4">
            <Button type="submit" className="bg-[#4a67a1] text-white px-6 py-2 rounded-lg hover:bg-[#3b558c]">Create</Button>
            <Button variant="secondary" onClick={() => setIsOpen(false)} className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-700">Cancel</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectModal;
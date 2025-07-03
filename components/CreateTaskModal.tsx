import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { createTask, getAllTask } from "@/features/task/taskActions";
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

  const dispatch = useDispatch<AppDispatch>();
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const decoded: any = SecureStorage.getItem('decoded')
  const userEmail = decoded?.email
  const userName = decoded?.fullName
// console.log
  const dummyUsers = [
    { name: userName, email: userEmail, avatar: "https://i.pravatar.cc/150?u=alice" },
    { name: "Bob Johnson", email: "bob@example.com", avatar: "https://i.pravatar.cc/150?u=bob" },
    { name: "Charlie Brown", email: "charlie@example.com", avatar: "https://i.pravatar.cc/150?u=charlie" },
    { name: "Daisy Ray", email: "daisy@example.com", avatar: "https://i.pravatar.cc/150?u=daisy" },
    { name: "Ethan Hunt", email: "ethan@example.com", avatar: "https://i.pravatar.cc/150?u=ethan" },
  ];

  const filteredUsers = dummyUsers.filter((user) =>
    user?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const [formData, setFormData] = useState<Task>({
    _id: "",
    id: "",
    idx: "",
    title: "",
    priority: 1,
    description: "",
    status: "todo",
    dueDate: "",
    createdBy: "",
    createdByEmail: "",
    assignedTo: "",
    assignedToEmail: "",
    type: "task"
  });



  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault()
    const decoded: any = SecureStorage.getItem('decoded')

    // setting dummy for now
    const { _id, id, idx, ...prevFormData } = formData
    const updatedFormData = {
      ...prevFormData,
      createdByEmail: decoded?.email,
      createdBy: decoded?.fullName,
      assignedToEmail: selectedUsers.join(", "),
      assignedTo: selectedUsers
        .map(email => dummyUsers.find(user => user.email === email)?.name)
        .filter(Boolean)
        .join(", "),
    };
    // setFormData(updatedFormData)
    dispatch(createTask(updatedFormData))
    dispatch(getAllTask(''))

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
                  {/* 
                  <div>
                    <Label htmlFor="assignedTo">Assigned To</Label>
                    <Input
                      id="assignedTo"
                      name="assignedTo"
                      required
                      value={formData.assignedTo}
                      onChange={handleInputChange}
                    />
                  </div> */}

                  {/* <div>
  <Label htmlFor="assignedTo">Assigned To</Label>
  <div className="border p-2 rounded-lg min-h-[3rem]">
    <div className="flex flex-wrap gap-2 mb-2">
      {selectedUsers.map((email) => {
        const user = dummyUsers.find((u) => u.email === email);
        return (
          <div
            key={email}
            className="flex items-center gap-2 bg-gray-200 text-black px-2 py-1 rounded-full"
          >
            <img src={user?.avatar} className="w-5 h-5 rounded-full" />
            <span className="text-sm">{user?.name}</span>
            <button
              type="button"
              className="ml-1 text-sm text-red-500"
              onClick={() => setSelectedUsers(selectedUsers.filter((e) => e !== email))}
            >
              ×
            </button>
          </div>
        );
      })}
    </div>

    <div className="max-h-40 overflow-y-auto">
      {dummyUsers.map((user) => (
        <label
          key={user.email}
          className="flex items-center gap-3 py-1 cursor-pointer"
        >
          <input
            type="checkbox"
            checked={selectedUsers.includes(user.email)}
            onChange={() => {
              if (selectedUsers.includes(user.email)) {
                setSelectedUsers(selectedUsers.filter((e) => e !== user.email));
              } else {
                setSelectedUsers([...selectedUsers, user.email]);
              }
            }}
          />
          <img src={user.avatar} className="w-6 h-6 rounded-full" />
          <span>{user.name}</span>
        </label>
      ))}
    </div>
  </div>
</div> */}
                  <div ref={dropdownRef} className="relative">
                    <Label htmlFor="assignedTo">Assigned To</Label>

                    {/* Trigger Box */}
                    <div
                      onClick={() => setDropdownOpen((prev) => !prev)}
                      className="border p-2 rounded-lg min-h-[3rem] cursor-pointer bg-white text-black"
                    >
                      <div className="flex flex-wrap gap-2">

                        {selectedUsers.length > 0 ? (
                          selectedUsers.map((email) => {
                            const user = dummyUsers.find((u) => u.email === email);
                            return (
                              <div
                                key={email}
                                className="flex items-center gap-1 bg-gray-200 px-2 py-1 rounded-full"
                              >
                                <img src={user?.avatar} className="w-5 h-5 rounded-full" />
                                <span className="text-sm">{user?.name}</span>
                                <button
                                  type="button"
                                  className="ml-1 text-red-500"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedUsers(selectedUsers.filter((e) => e !== email));
                                  }}
                                >
                                  ×
                                </button>
                              </div>
                            );
                          })
                        ) : (
                          <span className="text-gray-500">Click to select users</span>
                        )}
                      </div>
                    </div>

                    {/* Dropdown */}
                    {dropdownOpen && (
                      <div className="absolute z-10 mt-2 w-full bg-white border rounded-md shadow-md max-h-60 overflow-y-auto p-2 text-black">
                        <Input
                          placeholder="Search user..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="mb-2"
                        />

                        {filteredUsers.length > 0 ? (
                          filteredUsers.map((user) => (
                            <label
                              key={user.email}
                              className="flex items-center gap-2 py-1 px-2 rounded hover:bg-gray-100 cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                className="form-checkbox"
                                checked={selectedUsers.includes(user.email)}
                                onChange={(e) => {
                                  const isChecked = e.target.checked;
                                  if (isChecked) {
                                    setSelectedUsers([...selectedUsers, user.email]);
                                  } else {
                                    setSelectedUsers(
                                      selectedUsers.filter((email) => email !== user.email)
                                    );
                                  }
                                }}
                              />
                              <img src={user.avatar} className="w-6 h-6 rounded-full" />
                              <span>{user.name}</span>
                            </label>
                          ))
                        ) : (
                          <div className="text-sm text-gray-500 px-2">No users found</div>
                        )}
                      </div>
                    )}
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

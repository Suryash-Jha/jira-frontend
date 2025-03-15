"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Layout } from "@/components/layout"
import { ProjectBoard } from "@/components/project-board"
import { useState } from "react"
import CreateTaskModal from "@/components/CreateTaskModal"
import { Task } from "@/interfaces/tasks"

export default function Home() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
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
  return (
    <Layout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Project Board</h2>
          <div className="flex items-center space-x-2">
            <Button onClick={()=>setIsOpen(!isOpen)}>Create Issue</Button>
          </div>
        </div>

        <ProjectBoard />
        <CreateTaskModal 
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        formData={formData}
        setFormData={setFormData}
        />
      </div>
    </Layout>
  )
}
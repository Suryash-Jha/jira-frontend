"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Layout } from "@/components/layout"
import { ProjectBoard } from "@/components/project-board"
import { useEffect, useState } from "react"
import CreateTaskModal from "@/components/CreateTaskModal"
import { ToastContainer } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/redux/store"
import { getAllTask } from "@/features/task/taskActions"
import CreateProjectModal from "@/components/CreateProjectModal"

export default function Home() {
  const dispatch= useDispatch<AppDispatch>()
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState<boolean>(false);
  const {taskList, loading}= useSelector((state:RootState)=> state.task)
  useEffect(()=>{
    dispatch(getAllTask(''))
  }, [])
  console.log(taskList, '---=-=-==', loading)
  return (
    <Layout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
          <div className="flex items-center justify-between bg-[#8a9bbd] p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-white">Project Name</h2>
          <Button variant="outline" onClick={()=> setIsProjectModalOpen(!isProjectModalOpen)}>Create Project</Button>
        </div>
        <div className="flex items-center justify-end">
          <div className="flex items-center space-x-2">
            <Button onClick={()=>setIsOpen(!isOpen)}>Create Issue</Button>
          </div>
        </div>

        <ProjectBoard taskList={taskList} viewOnly={false}/>
        <CreateProjectModal 
        isOpen={isProjectModalOpen}
        setIsOpen={setIsProjectModalOpen}
        />
        <CreateTaskModal 
        isOpen={isOpen}
        setIsOpen={setIsOpen}
       
        />
      </div>
        <ToastContainer 
        position='bottom-right'
        />
    </Layout>
  )
}
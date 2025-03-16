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

export default function Home() {
  const dispatch= useDispatch<AppDispatch>()
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {taskList, loading}= useSelector((state:RootState)=> state.task)
  useEffect(()=>{
    dispatch(getAllTask(''))
  }, [])
  console.log(taskList, '---=-=-==', loading)
  return (
    <Layout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Project Board</h2>
          <div className="flex items-center space-x-2">
            <Button onClick={()=>setIsOpen(!isOpen)}>Create Issue</Button>
          </div>
        </div>

        <ProjectBoard taskList={taskList}/>
        <CreateTaskModal 
        isOpen={isOpen}
        setIsOpen={setIsOpen}
       
        />
      </div>
        <ToastContainer />
    </Layout>
  )
}
"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Layout } from "@/components/layout"
import { ProjectBoard } from "@/components/project-board"

export default function Home() {
  return (
    <Layout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Project Board</h2>
          <div className="flex items-center space-x-2">
            <Button>Create Issue</Button>
          </div>
        </div>
        <ProjectBoard />
      </div>
    </Layout>
  )
}
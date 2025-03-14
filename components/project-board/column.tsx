"use client"

import { ReactNode } from "react"

interface ColumnProps {
  title: string
  children: ReactNode
}

export function Column({ title, children }: ColumnProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">{title}</h3>
        <span className="text-sm text-muted-foreground">3 issues</span>
      </div>
      <div className="min-h-[500px] bg-secondary/30 rounded-lg p-4">
        {children}
      </div>
    </div>
  )
}
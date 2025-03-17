"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { Column } from "./project-board/column"
import { SortableItem } from "./project-board/sortable-item"
import { Task } from "@/interfaces/tasks"
import { updateTaskStatus } from "@/features/task/taskActions"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/redux/store"


interface Column {
  id: string
  title: string
  tasks: Task[]
}

interface Props{
  taskList:any;
}
export const ProjectBoard: React.FC<Props>= ({
  taskList
}) => {
  const dispatch= useDispatch<AppDispatch>()
  const [columns, setColumns] = useState<Column[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
    // COPIED FROM CHATGPT!! WILL WRITE IT AGAIN
    const transformTasks = (apiTasks: any) => {
      const columnsMap: any = {};
      // Hardcoded statuses
      const status= ['todo', 'in-progress', 'done']
      status.map((item)=>{
        columnsMap[item] = {
          id: item,
          title: item.replace(/-/g, ' ').replace(/\b\w/g, (c: any) => c.toUpperCase()),
          tasks: []
        };
      })
      apiTasks.forEach((task: any, i:any) => {
        const columnId = task.status; 

  
        columnsMap[columnId].tasks.push({
          id: task.id,
          idx: i,
          title: task.title,
          priority: task.priority === 1 ? 'low' : task.priority === 2 ? 'medium' : 'high',
          assignedTo: task.assignedTo,
          type: 'task', // Assuming all are tasks; modify if needed
        });
      });
  
      return Object.values(columnsMap);
    }
  useEffect(() => {
    if (taskList && taskList.data && taskList.data.length > 0) {
      const transformedData: any = transformTasks(taskList.data)
      setColumns(transformedData)
    }

  }, [taskList])
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragStart = (event: DragStartEvent) => {
    console.log(event, '--jkj')
    setActiveId(event.active.id as string)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    console.log(active, over, '--oo')
    if (!over) return

    const activeTask = findTask(active.id as string)
    const overTask = findTask(over.id as string)

    if (!activeTask || !overTask) return

    const activeColumn = findColumn(activeTask)
    const overColumn = findColumn(overTask)

    if (!activeColumn || !overColumn) return

    if (activeColumn.id !== overColumn.id) {
      setColumns(columns =>
        columns.map(col => {
          if (col.id === activeColumn.id) {
            console.log(activeTask.id, '----->', activeColumn.id, '---->', overColumn.id)
            dispatch(updateTaskStatus({id: activeTask.id, body: {status:overColumn.id}}))
            return {
              ...col,
              tasks: col.tasks.filter(task => task.id !== activeTask.id)
            }
          }
          if (col.id === overColumn.id) {
            return {
              ...col,
              tasks: [...col.tasks, activeTask],
            }
          }
          return col
        })
      )
    }
    else {
      setColumns(columns => {
        const newColumns = columns.map(col => {
          if (col.id === activeColumn.id) {
            const taskIndex = col.tasks.findIndex(task => task.id === activeTask.id)
            const overIndex = col.tasks.findIndex(task => task.id === overTask.id)
            const newTasks = arrayMove(col.tasks, taskIndex, overIndex)
            return {
              ...col,
              tasks: newTasks
            }
          }
          return col
        })
        return newColumns
      })
    }
    setActiveId(null)
  }

  const findTask = (id: string) => {
    for (const column of columns) {
      const task = column.tasks.find(task => task.id === id)
      if (task) return task
    }
    return null
  }

  const findColumn = (task: Task) => {
    return columns.find(column => column.tasks.some(t => t.id === task.id))
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500'
      case 'medium':
        return 'bg-yellow-500'
      case 'low':
        return 'bg-green-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'bug':
        return '🐛'
      case 'story':
        return '📖'
      default:
        return '✓'
    }
  }

  const renderTask = (task: Task) => (
    <Card className="p-4 space-y-3 cursor-move hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span>{getTypeIcon(task.type)}</span>
          <Badge variant="outline">{task.idx+1}</Badge>
        </div>
        <div className={`w-2 h-2 rounded-full ${getPriorityColor(String(task.priority))}`} />
      </div>
      <p className="text-sm">{task?.title}</p>
      <div className="flex items-center justify-between">
        <Avatar className="h-6 w-6">
          <AvatarFallback>{task?.assignedTo?.split(' ')[0][0]}</AvatarFallback>
        </Avatar>
        <Badge variant="secondary">{task?.priority}</Badge>
      </div>
    </Card>
  )

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map(column => (
          <Column key={column.id} title={column.title} taskCount={column.tasks.length}>
            <SortableContext items={column.tasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-3">
                {column.tasks.map(task => (
                  <SortableItem key={task.id} id={task.id}>
                    {renderTask(task)}
                  </SortableItem>
                ))}
              </div>
            </SortableContext>
          </Column>
        ))}
      </div>
      <DragOverlay>
        {activeId ? renderTask(findTask(activeId)!) : null}
      </DragOverlay>
    </DndContext>
  )
}


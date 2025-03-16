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
// import { Task } from "@/interfaces/tasks"

// interface Task {
//   id: string
//   content: string
//   priority: 'high' | 'medium' | 'low'
//   assignee: string
//   type: 'task' | 'bug' | 'story'
// }

interface Column {
  id: string
  title: string
  tasks: Task[]
}

// const initialColumns: Column[] = [
//   {
//     id: 'todo',
//     title: 'To Do',
//     tasks: [
//       { id: '1', content: 'Implement authentication', priority: 'high', assignee: 'John D.', type: 'story' },
//       { id: '2', content: 'Fix navigation bug', priority: 'medium', assignee: 'Sarah M.', type: 'bug' },
//       { id: '3', content: 'Add user settings', priority: 'low', assignee: 'Mike R.', type: 'task' },
//     ],
//   },
//   {
//     id: 'in-progress',
//     title: 'In Progress',
//     tasks: [
//       { id: '4', content: 'Update documentation', priority: 'medium', assignee: 'Emma W.', type: 'task' },
//       { id: '5', content: 'Implement dark mode', priority: 'low', assignee: 'John D.', type: 'story' },
//     ],
//   },
//   {
//     id: 'done',
//     title: 'Done',
//     tasks: [
//       { id: '6', content: 'Setup project structure', priority: 'high', assignee: 'Sarah M.', type: 'task' },
//     ],
//   },
// ]
interface Props{
  taskList: any;
}

export const ProjectBoard: React.FC<Props> = ({
  taskList
}) => {
  const [columns, setColumns] = useState<Column[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)

  // COPIED FROM CHATGPT!! WILL WRITE IT AGAIN
  const transformTasks= (apiTasks: any) => {
    const columnsMap: any = {};
  
    apiTasks.forEach((task: any) => {
      const columnId = task.status; // 'todo', 'in-progress', 'done', etc.
  
      if (!columnsMap[columnId]) {
        columnsMap[columnId] = {
          id: columnId,
          title: columnId.replace(/-/g, ' ').replace(/\b\w/g, (c:any) => c.toUpperCase()),
          tasks: []
        };
      }
  
      columnsMap[columnId].tasks.push({
        id: task.id,
        content: task.title,
        priority: task.priority === 1 ? 'low' : task.priority === 2 ? 'medium' : 'high',
        assignee: task.assignedTo,
        type: 'task', // Assuming all are tasks; modify if needed
      });
    });
  
    return Object.values(columnsMap);
  }
  
  useEffect(()=>{
    if(taskList && taskList.data && taskList.data.length > 0 ){
      const transformedData : any= transformTasks(taskList.data)
      setColumns(transformedData)
    }

  }, [taskList])
console.log(columns, '----->>>')
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
    setActiveId(event.active.id as string)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) return

    const activeTask = findTask(active.id as string)
    const overTask = findTask(over.id as string)

    if (!activeTask || !overTask) return

    const activeColumn = findColumn(activeTask)
    const overColumn = findColumn(overTask)

    if (!activeColumn || !overColumn) return

    if (activeColumn.id !== overColumn.id) {
      setColumns(columns => {
        const newColumns = columns.map(col => {
          if (col.id === activeColumn.id) {
            return {
              ...col,
              tasks: col.tasks.filter(task => task._id !== activeTask._id)
            }
          }
          if (col.id === overColumn.id) {
            console.log(activeTask, '----->>>', col.id)
            return {
              ...col,
              tasks: [...col.tasks, activeTask]
            }

          }
          return col
        })
        return newColumns
      })
    } else {
      setColumns(columns => {
        const newColumns = columns.map(col => {
          if (col.id === activeColumn.id) {
            const taskIndex = col.tasks.findIndex(task => task._id === activeTask._id)
            const overIndex = col.tasks.findIndex(task => task._id === overTask._id)
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
      const task = column.tasks.find(task => task._id === id)
      if (task) return task
    }
    return null
  }

  const findColumn = (task: Task) => {
    return columns.find(column => column.tasks.some(t => t._id === task._id))
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
          <Badge variant="outline">{task._id}</Badge>
        </div>
        <div className={`w-2 h-2 rounded-full ${getPriorityColor(String(task.priority))}`} />
      </div>
      <p className="text-sm">{task.title}</p>
      <div className="flex items-center justify-between">
        <Avatar className="h-6 w-6">
          <AvatarFallback>{task.assignedTo.split(' ')[0][0]}</AvatarFallback>
        </Avatar>
        <Badge variant="secondary">{task.priority}</Badge>
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
          <Column key={column.id} title={column.title}>
            <SortableContext items={column.tasks.map(task => task._id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-3">
                {taskList && taskList.data && taskList.data.map((task:any) => (
                  <SortableItem key={task._id} id={task._id}>
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
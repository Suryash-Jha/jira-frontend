export interface Task{
    _id: string,
    id: string,
    title: string,
    priority: number,
    description: string,
    status: string,
    dueDate: string,
    createdBy: string,
    createdByEmail: string,
    assignedTo: string,
    assignedToEmail: string,
    type: string,
}
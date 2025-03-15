
  export interface TaskState {
  
    loading: boolean; 
    error: string | null; 
    createTaskResp: any;
  }
  
  export const initialState: TaskState = {
   
    loading: false, 
    error: null, 
    createTaskResp: []

  };

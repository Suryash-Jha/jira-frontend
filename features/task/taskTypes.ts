
  export interface TaskState {
  
    loading: boolean; 
    error: string | null; 
    createTaskResp: any;
    taskList: any;
    teamList: any;
  }
  
  export const initialState: TaskState = {
   
    loading: false, 
    error: null, 
    createTaskResp: [],
    taskList: [],
    teamList: [],

  };

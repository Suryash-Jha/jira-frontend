
export interface ProjectState {
  projectList: any;
  loading: boolean; 
  error: string | null; 
  
}

// Initial state for the auth slice
export const initialState: ProjectState = {
  projectList: null,
    loading: false,
    error: '' 
};
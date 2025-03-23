
export interface OrganizationState {
  orgnizationList: any;
  loading: boolean; 
  error: string | null; 
  
}

// Initial state for the auth slice
export const initialState: OrganizationState = {
  orgnizationList: [],
    loading: false,
    error: '' 
};
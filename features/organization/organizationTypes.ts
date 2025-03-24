
export interface OrganizationState {
  organizationList: any;
  loading: boolean; 
  error: string | null; 
  
}

// Initial state for the auth slice
export const initialState: OrganizationState = {
  organizationList: [],
    loading: false,
    error: '' 
};
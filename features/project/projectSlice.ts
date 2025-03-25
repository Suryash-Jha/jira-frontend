import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import SecureStorage from '../../utils/SecureStorage';
import { createProject, getProjectList } from './projectActions';
import { initialState } from './projectTypes';

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createProject.fulfilled,(state,action: PayloadAction<any>,
        ) => {
          state.loading = false;
        },
      )
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getProjectList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getProjectList.fulfilled,(state,action: PayloadAction<any>) => {
          state.loading = false;
          state.projectList= action.payload;
        },
      )
      .addCase(getProjectList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      
     
  },
});

export const {  } = projectSlice.actions;
export default projectSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState } from './taskTypes';
import {
    createTask
} from './taskActions';
import SecureStorage from '../../utils/SecureStorage';

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
   clearState(state){
    console.log('clearState')
   },
    
  },
  extraReducers: (builder) => {
    builder
      // Login Cases
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createTask.fulfilled,
        (
          state,
          action: PayloadAction<any>,
        ) => {
          state.loading = false;
          state.createTaskResp= action.payload
        },
      )
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

     
     
  },
});

export const { clearState } = taskSlice.actions;
export default taskSlice.reducer;

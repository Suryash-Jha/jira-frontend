import {createAsyncThunk } from '@reduxjs/toolkit';

import {
  createTaskApi,
} from '../../api/taskApi';
import { toast } from 'react-toastify';



export const createTask = createAsyncThunk(
  'auth/createTask',
  async (
    body: any,
    { rejectWithValue },
  ) => {
    try {
      const response = await createTaskApi(body);
      console.log(response, '====')
      toast.success('Task Creation Successful!')

      return response;
    } catch (error: any) {
      toast.error('Task Creation Failed!')

      return rejectWithValue(error.response?.data?.message || 'Task Creation failed');
    }
  },
);



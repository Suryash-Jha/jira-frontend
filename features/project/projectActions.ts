import { createProjectApi, getProjectListApi } from "@/api/projectApi";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const createProject = createAsyncThunk(
    'task/createProject',
    async (
      body: any,
      { rejectWithValue },
    ) => {
      try {
        const response = await createProjectApi(body);
        toast.success('Project Creation Successful!')
  
        return response;
      } catch (error: any) {
        toast.error('Project Creation Failed!')
  
        return rejectWithValue(error.response?.data?.message || 'Project Creation failed');
      }
    },
  );
export const getProjectList = createAsyncThunk(
    'task/getProjectList',
    async (
      url: any,
      { rejectWithValue },
    ) => {
      try {
        const response = await getProjectListApi(url);
        toast.success('Project Fetching Successful!')
  
        return response;
      } catch (error: any) {
        toast.error('Project Fetching Failed!')
  
        return rejectWithValue(error.response?.data?.message || 'Project Fetching failed');
      }
    },
  );
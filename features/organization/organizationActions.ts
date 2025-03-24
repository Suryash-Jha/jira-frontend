import { createOrganizationApi, getOrganizationListApi } from "@/api/organization";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const createOrganization = createAsyncThunk(
    'task/createOrganization',
    async (
      body: any,
      { rejectWithValue },
    ) => {
      try {
        const response = await createOrganizationApi(body);
        toast.success('Organization Creation Successful!')
  
        return response;
      } catch (error: any) {
        toast.error('Organization Creation Failed!')
  
        return rejectWithValue(error.response?.data?.message || 'Organization Creation failed');
      }
    },
  );
export const getOrganizationList = createAsyncThunk(
    'task/getOrganizationList',
    async (
      url: any,
      { rejectWithValue },
    ) => {
      try {
        const response = await getOrganizationListApi(url);
        toast.success('Organization Fetching Successful!')
  
        return response;
      } catch (error: any) {
        toast.error('Organization Fetching Failed!')
  
        return rejectWithValue(error.response?.data?.message || 'Organization Fetching failed');
      }
    },
  );
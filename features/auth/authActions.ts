import {createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { setLoginData } from '../../utils/storage';
import { AppThunk } from '../../redux/store';
import { logout as logoutAction } from './authSlice';
import { jwtDecode } from 'jwt-decode';
import {
  loginApi,
  registerApi,
} from '../../api/authApi';
import SecureStorage from '../../utils/SecureStorage';
import { toast } from 'react-toastify';



export const login = createAsyncThunk(
  'auth/login',
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await loginApi({ email, password });
      console.log(response, '====')
      setLoginData(response.access_token);
      toast.success('Login Successful!')

      return response;
    } catch (error: any) {
      toast.error('Login Failed!')

      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  },
);

export const register = createAsyncThunk(
  'auth/register',
  async (
    { fullName, email, password }: { fullName: string; email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await registerApi({ fullName, email, password });
      // setLoginData(response.access_token, response.refreshToken);
      toast.success('Registration Successful!')

      return response;
    } catch (error: any) {
      toast.error('Registration Failed!')

      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  },
);
export const logout = (): AppThunk => async (dispatch) => {
  dispatch(logoutAction()); 
  return Promise.resolve(); 
};


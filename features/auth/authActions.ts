import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import { getUserToken, setLoginData } from '../../utils/storage';
import { AppThunk } from '../../redux/store';
import { logout as logoutAction } from './authSlice';
import { jwtDecode } from 'jwt-decode';
import {
  loginApi,
  registerApi,
} from '../../api/authApi';
import SecureStorage from '../../utils/SecureStorage';



export const login = createAsyncThunk(
  'auth/login',
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await loginApi({ email, password });
      // setLoginData(response.access_token, response.refreshToken);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  },
);

export const register = createAsyncThunk(
  'auth/login',
  async (
    { username, email, password }: { username: string; email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await registerApi({ username, email, password });
      // setLoginData(response.access_token, response.refreshToken);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  },
);
export const logout = (): AppThunk => async (dispatch) => {
  dispatch(logoutAction()); // Dispatch the logout slice action
  return Promise.resolve(); // Return a resolved promise to match the expected return type
};


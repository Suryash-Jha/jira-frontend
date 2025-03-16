import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState } from './authTypes';
import {
  login,
  register
} from './authActions';
import SecureStorage from '../../utils/SecureStorage';

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.accessToken=null
      SecureStorage.removeItem('token');
      SecureStorage.removeItem('decoded');
      window.location.href = '/auth'; 
    },
    
  },
  extraReducers: (builder) => {
    builder
      // Login Cases
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        login.fulfilled,
        (
          state,
          action: PayloadAction<{ access_token: string; refreshToken: string }>,
        ) => {
          state.loading = false;
          state.accessToken = action.payload.access_token;
          state.refreshToken = action.payload.refreshToken;
          state.isLoggedIn = true;
        },
      )
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        register.fulfilled,
        (state, action: PayloadAction<{ user: any } | null>) => {
          state.loading = false;
          if (action.payload?.user) {
            state.user = action.payload.user;
            state.isLoggedIn = true;
          } else {
            state.user = null;
            state.isLoggedIn = false;
          }
        },
      )
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
     
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

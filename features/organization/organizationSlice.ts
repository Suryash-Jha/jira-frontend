import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState } from './organizationTypes';

import SecureStorage from '../../utils/SecureStorage';
import { createOrganization, getOrganizationList } from './organizationActions';
import { getOrganizationListApi } from '@/api/organization';

const organizationSlice = createSlice({
  name: 'organization',
  initialState,
  reducers: {
    
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrganization.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createOrganization.fulfilled,(state,action: PayloadAction<any>,
        ) => {
          state.loading = false;
        },
      )
      .addCase(createOrganization.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getOrganizationList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getOrganizationList.fulfilled,(state,action: PayloadAction<any>) => {
          state.loading = false;
          state.organizationList= action.payload;
        },
      )
      .addCase(getOrganizationList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      
     
  },
});

export const {  } = organizationSlice.actions;
export default organizationSlice.reducer;

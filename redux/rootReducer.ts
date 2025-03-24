import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import taskReducer from '../features/task/taskSlice';
import organizationReducer from '../features/organization/organizationSlice';


const rootReducer = combineReducers({
  auth: authReducer,
  task: taskReducer,
  organization: organizationReducer,
});

export default rootReducer;

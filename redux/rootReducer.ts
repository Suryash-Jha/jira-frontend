import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import taskReducer from '../features/task/taskSlice';


const rootReducer = combineReducers({
  auth: authReducer,
  task: taskReducer,

});

export default rootReducer;

import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer'; // Import combined reducers

const store = configureStore({
  reducer: rootReducer, // Use rootReducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializability check for specific scenarios
    }),
  devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in non-production environments
});

export type AppDispatch = typeof store.dispatch; // Type for dispatch
export type RootState = ReturnType<typeof rootReducer>; // Type for the root state
export type AppThunk = (
  dispatch: AppDispatch,
  getState: () => RootState,
) => Promise<void>; // Async thunk type

export default store;

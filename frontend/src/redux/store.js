import { configureStore } from '@reduxjs/toolkit';
import foldersReducer from './folderSlice';
import authReducer from './authSlice';
import uiReducer from './uiSlice';

// STORE OR GLOBALIZED STATE(S)
export const store = configureStore({
    reducer: {
        data: foldersReducer,
        auth: authReducer,
        ui: uiReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
  });
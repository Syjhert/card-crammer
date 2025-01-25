import { configureStore } from '@reduxjs/toolkit';
import foldersReducer from './reducer';

// STORE OR GLOBALIZED STATE(S)
export const store = configureStore({
    reducer: {
        folders: foldersReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
  });
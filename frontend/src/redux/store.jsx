import { configureStore } from '@reduxjs/toolkit';
import foldersReducer from './reducer';

// STORE OR GLOBALIZED STATE(S)
export const store = configureStore({
    reducer: {
        data: foldersReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
  });
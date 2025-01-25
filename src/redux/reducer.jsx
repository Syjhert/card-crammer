import { createSlice } from "@reduxjs/toolkit";
import { fetchFolders } from "./actions";

const foldersSlice = createSlice({
  name: 'folders',
  initialState: {
    isLoading: false,
    data: [],
    error: null,
    cached: false
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFolders.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchFolders.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.cached = true;
    });
    builder.addCase(fetchFolders.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

  }
});

export default foldersSlice.reducer;
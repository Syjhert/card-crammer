import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createFolder, createFlashcard, getAllFolders, getFlashcards, updateFolderName, updateFolderFlashcards, deleteFolder } from "../mongodb/dbFunctions";


const foldersSlice = createSlice({
  name: 'data',
  initialState: {
    isLoading: false,
    folders: [],
    error: null,
    cached: false
  },
  reducers: {
    // Handle adding a new folder
    addNewFolder(state, action) {
      state.folders.push({
        folderID: state.folders.length + 1,  // Generate a new folder id, simple length + 1
        name: action.payload.name,
        flashcards: [],  // New folder starts with an empty flashcards array
      });
    },
    
    // Handle editing an existing folder
    editFolder(state, action) {
      const { folderID, name, flashcards } = action.payload;
      const folder = state.folders.find((folder) => folder.folderID === folderID);
      if (folder) {
        folder.name = name;
        folder.flashcards = flashcards;
      }
    },

    // Handle toggling the answer visibility for a flashcard
    toggleAnswer(state, action) {
      const { folderID, flashcardID } = action.payload;
      const folder = state.folders.find((folder) => folder.folderID === folderID);
      if (folder) {
        const flashcard = folder.flashcards.find((flashcard) => flashcard.id === flashcardID);
        if (flashcard) {
          flashcard.showAnswer = !flashcard.showAnswer;
        }
      }
    },
  },
  extraReducers: (builder) => {
    // fetching of folders from API is still loading
    builder.addCase(fetchFolders.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    // fetching is done
    builder.addCase(fetchFolders.fulfilled, (state, action) => {
      state.isLoading = false;
      state.folders = action.payload;
      state.cached = true;
    });
    // there is an error when fetching
    builder.addCase(fetchFolders.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

  }
});

export const fetchFolders = createAsyncThunk("folders/fetchFolders", async (_, { getState })=> {
  const { data } = getState(); // Access current state
  const cachedData = data.folders; // Data (folders) already stored in Redux
  console.log("Fetch called");

  // If data already exists in the state, return it and skip the API call
  if ((cachedData && cachedData.length > 0) || data.cached) {
    console.log("Returned cached data:");
    console.log(cachedData);
    return cachedData;
  }
  try {
    let folders = getAllFolders();
    folders.forEach(folder => {
      folder.flashcards = getFlashcards(folder.folder_id);
    });

    return folders;
  } catch (error) {
    throw Error(error);
  }
})

export const { addNewFolder, editFolder, toggleAnswer } = foldersSlice.actions;
export default foldersSlice.reducer;
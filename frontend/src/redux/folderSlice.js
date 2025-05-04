import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_URL = import.meta.env.VITE_API_URL; // all .env variable must start with VITE_
const getToken = () => {
  return localStorage.getItem('token');
}

// fetch all folders (GET)
export const fetchFolders = createAsyncThunk("folders/fetchFolders", async () => {
  const response = await fetch(`${API_URL}/folders`, {
    method: "GET",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`
    },

  });
  const data = await response.json();
  if (!response.ok) throw new Error("Failed to fetch folders");
  return data;
});

// create new folder (POST)
export const createFolder = createAsyncThunk("folders/createFolder", async (folderData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`
    },
    body: JSON.stringify(folderData),
  });
  if (!response.ok) throw new Error("Failed to create folder");
  const data = await response.json();
  return data;
});

// delete a folder (DELETE)
export const deleteFolder = createAsyncThunk("folders/deleteFolder", async (folderID) => {
  const response = await fetch(`${API_URL}/folders/${folderID}`, { 
    method: "DELETE",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`
    },
  });
  if (!response.ok) throw new Error("Failed to delete folder");
  return folderID;
});

// Update a folder (PATCH)
export const editFolder = createAsyncThunk("folders/editFolder", async (updatedFolder) => {
  const editResponse = await fetch(`${API_URL}/folders/${updatedFolder._id}`, {
    method: "PATCH",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`
    },
    body: JSON.stringify(updatedFolder),
  });
  if (!editResponse.ok) throw new Error("Failed to update folder");

  const getResponse = await fetch(`${API_URL}/folders/${updatedFolder._id}`, {
    method: "GET",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`
    },
  });
  if (!getResponse.ok) {
    throw new Error("Failed to fetch updated folder");
  }

  const getResponseFolder = getResponse.json();
  return getResponseFolder;
});

const foldersSlice = createSlice({
  name: 'data',
  initialState: {
    isLoading: false,
    folders: [],
    error: null,
    cached: false
  },
  reducers: {
    toggleAnswer(state, action) {
      const { folderID, flashcardID } = action.payload;
  
      state.folders = state.folders.map(folder => {
          if (folder._id === folderID) {
              return {
                  ...folder,
                  flashcards: folder.flashcards.map(flashcard =>
                      flashcard._id === flashcardID
                          ? { ...flashcard, showAnswer: !flashcard.showAnswer }
                          : flashcard
                  )
              };
          }
          return folder;
      });
  }
  }, // removed majority of the reducers since all my reducers are async
  extraReducers: (builder) => {
    builder
    // fetching of folders from API is still loading
    .addCase(fetchFolders.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    })
    // fetching is done
    .addCase(fetchFolders.fulfilled, (state, action) => {
      state.isLoading = false;
      state.folders = action.payload.map(folder => ({
        ...folder,
        flashcards: folder.flashcards.map(flashcard => ({
            ...flashcard,
            showAnswer: false  // every flashcard has `showAnswer` set to false at first
        }))
      }));
    })
    // there is an error when fetching
    .addCase(fetchFolders.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // success creating Folder
    .addCase(createFolder.fulfilled, (state, action) => {
      state.folders.push(action.payload);
    })
    .addCase(createFolder.rejected, (state, action) => {
      console.log("Error creating folder...");
    })

    // success deleting folder
    .addCase(deleteFolder.fulfilled, (state, action) => {
      state.folders = state.folders.filter(folder => {
        console.log(`${folder._id} vs ${action.payload._id}`);
        return folder._id !== action.payload._id
      });
    })
    .addCase(deleteFolder.rejected, (state, action) => {
      console.log("Error deleting folder...");
    })

    // success updating folder
    .addCase(editFolder.fulfilled, (state, action) => {
      const folder = state.folders.find(folder => folder._id === action.payload._id);
      if (folder) {
        Object.assign(folder, action.payload);
      } else {
        console.log("Folder to update not found...");
      }
    })
    .addCase(editFolder.rejected, (state, action) => {
      console.log("Error updating folder...");
    })
  }
});

export const { toggleAnswer } = foldersSlice.actions;
export default foldersSlice.reducer;
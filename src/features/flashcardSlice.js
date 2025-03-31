import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const flashcardList = createSlice({
    name: "flashcardList",
    initialState: {
      flashcards: [],
      loading: false,
      error: null,
    },
    
  });
  
  export default flashcardList.reducer;
  
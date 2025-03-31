import { configureStore } from "@reduxjs/toolkit";
import flashcardReducer from "../features/flashcardSlice"; 
export const store = configureStore({
  reducer: {
    app : flashcardReducer, 
  },
});


import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "Selected Word",
};

export const selectedWordSlice = createSlice({
  name: " selectedWord",
  initialState,
  reducers: {
    setSelectedWord: (state, action) => {
      state.value = action.payload;
    },
    resetSelectedWord: (state) => {
      state.value = "Selected Word";
    },
  },
});

export const { setSelectedWord, resetSelectedWord } = selectedWordSlice.actions;

export default selectedWordSlice.reducer;

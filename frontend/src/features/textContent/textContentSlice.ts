import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { localStorageKeys } from "../../constants.js";

const initialState = {
  value: localStorage.getItem(localStorageKeys.TEXT_CONTENT) ?? null,
};

export const textContentSlice = createSlice({
  name: "textContent",
  initialState,
  reducers: {
    setTextContent: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
      localStorage.setItem(localStorageKeys.TEXT_CONTENT, action.payload);
    },
    resetTextContent: (state) => {
      state.value = null;
      localStorage.removeItem(localStorageKeys.TEXT_CONTENT);
    },
  },
});

export const { setTextContent, resetTextContent } = textContentSlice.actions;

export default textContentSlice.reducer;

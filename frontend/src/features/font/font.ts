import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { localStorageKeys } from "../../constants.js";

const initialState = {
  size: localStorage.getItem(localStorageKeys.FONT_SIZE) ?? "1.25rem",
};

export const fontSlice = createSlice({
  name: "font",
  initialState,
  reducers: {
    setFontSize: (state, action: PayloadAction<string>) => {
      state.size = action.payload;
      localStorage.setItem(localStorageKeys.FONT_SIZE, action.payload);
    },
    resetFontSize: (state) => {
      state.size = "1.25rem";
      localStorage.removeItem(localStorageKeys.FONT_SIZE);
    },
  },
});

export const { setFontSize, resetFontSize } = fontSlice.actions;

export default fontSlice.reducer;

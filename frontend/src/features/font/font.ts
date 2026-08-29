import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  size: localStorage.getItem("fontSize") ?? "1.25rem",
};

export const fontSlice = createSlice({
  name: "font",
  initialState,
  reducers: {
    setFontSize: (state, action: PayloadAction<string>) => {
      state.size = action.payload;
      localStorage.setItem("fontSize", action.payload);
    },
    resetFontSize: (state) => {
      state.size = "1.25rem";
      localStorage.removeItem("fontSize");
    },
  },
});

export const { setFontSize, resetFontSize } = fontSlice.actions;

export default fontSlice.reducer;

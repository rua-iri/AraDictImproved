import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  size: localStorage.getItem("fontSize")
    ? localStorage.getItem("fontSize")
    : "sm",
};

export const fontSlice = createSlice({
  name: "font",
  initialState,
  reducers: {
    setFontSize: (state, action) => {
      state.size = action.payload;
      localStorage.setItem("fontSize", action.payload);
    },
    resetFontSize: (state) => {
      state.size = null;
      localStorage.removeItem("fontSize");
    },
  },
});

export const { setFontSize, resetFontSize } = fontSlice.actions;

export default fontSlice.reducer;

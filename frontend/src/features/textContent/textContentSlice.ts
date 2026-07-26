import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  value: localStorage.getItem("textContent") ?? null,
};

export const textContentSlice = createSlice({
  name: "textContent",
  initialState,
  reducers: {
    setTextContent: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
      localStorage.setItem("textContent", action.payload);
    },
    resetTextContent: (state) => {
      state.value = null;
      localStorage.removeItem("textContent");
    },
  },
});

export const { setTextContent, resetTextContent } = textContentSlice.actions;

export default textContentSlice.reducer;

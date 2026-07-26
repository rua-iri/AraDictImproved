import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  value: localStorage.getItem("selectedVoice") ?? "Leila",
};

export const voiceSlice = createSlice({
  name: "voice",
  initialState,
  reducers: {
    setVoice: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
      localStorage.setItem("selectedVoice", action.payload);
    },
  },
});

export const { setVoice } = voiceSlice.actions;

export default voiceSlice.reducer;

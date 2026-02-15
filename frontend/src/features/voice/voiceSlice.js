import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: localStorage.getItem("selectedVoice")
    ? localStorage.getItem("selectedVoice")
    : "Leila",
};

export const voiceSlice = createSlice({
  name: "voice",
  initialState,
  reducers: {
    setVoice: (state, action) => {
      state.value = action.payload;
      localStorage.setItem("selectedVoice", action.payload);
    },
  },
});

export const { setVoice } = voiceSlice.actions;

export default voiceSlice.reducer;

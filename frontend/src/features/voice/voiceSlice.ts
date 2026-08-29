import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { localStorageKeys } from "../../constants.js";

const initialState = {
  value: localStorage.getItem(localStorageKeys.SELECTED_VOICE) ?? "Leila",
};

export const voiceSlice = createSlice({
  name: "voice",
  initialState,
  reducers: {
    setVoice: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
      localStorage.setItem(localStorageKeys.SELECTED_VOICE, action.payload);
    },
  },
});

export const { setVoice } = voiceSlice.actions;

export default voiceSlice.reducer;

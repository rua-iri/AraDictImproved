import { configureStore } from "@reduxjs/toolkit";
import voiceReducer from "../features/voice/voiceSlice.js";
import selectedWordReducer from "../features/selectedWord/selectedWordSlice.js";
import textContentReducer from "../features/textContent/textContentSlice.js";
import fontSliceReducer from "../features/font/font.js";

export const store = configureStore({
  reducer: {
    voice: voiceReducer,
    selectedWord: selectedWordReducer,
    textContent: textContentReducer,
    fontSlice: fontSliceReducer,
  },
});

import { configureStore } from "@reduxjs/toolkit";
import voiceReducer from "../features/voice/voiceSlice";
import selectedWordReducer from "../features/selectedWord/selectedWordSlice";
import textContentReducer from "../features/textContent/textContentSlice";
import fontSliceReducer from "../features/font/font";

export const store = configureStore({
  reducer: {
    voice: voiceReducer,
    selectedWord: selectedWordReducer,
    textContent: textContentReducer,
    fontSlice: fontSliceReducer,
  },
});

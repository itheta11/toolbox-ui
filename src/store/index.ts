import { configureStore } from "@reduxjs/toolkit";
import sidePanelReducer from "./sidePanelSlice";

export const store = configureStore({
  reducer: {
    sidePanel: sidePanelReducer,
  },
});

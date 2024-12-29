import { configureStore } from "@reduxjs/toolkit";
import sidePanelReducer from "./sidePanelSlice";
import jsonItemsReducer from "./jsonItems";

export const store = configureStore({
  reducer: {
    sidePanel: sidePanelReducer,
    jsonItems: jsonItemsReducer,
  },
});

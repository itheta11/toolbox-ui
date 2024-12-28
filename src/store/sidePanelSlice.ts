// store/sidePanelSlice.js
import { createSlice } from "@reduxjs/toolkit";

const sidePanelSlice = createSlice({
  name: "sidePanel",
  initialState: { isExpanded: false },
  reducers: {
    expandPanel: (state) => {
      state.isExpanded = true;
    },
    collapsePanel: (state) => {
      state.isExpanded = false;
    },
  },
});

export const { expandPanel, collapsePanel } = sidePanelSlice.actions;
export default sidePanelSlice.reducer;

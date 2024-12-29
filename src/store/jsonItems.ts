import { createSlice } from "@reduxjs/toolkit";
import {
  JsonItem,
  loadJsonItemsFromLocalStorage,
  saveJsonItemsToLocalStorage,
} from "./localstorage";

const getFromStorage = loadJsonItemsFromLocalStorage();
const initialState = {
  items: getFromStorage ? JSON.parse(getFromStorage) : ([] as JsonItem[]), // Load from localStorage on initialization
};

const itemsSlice = createSlice({
  name: "jsonItems",
  initialState,
  reducers: {
    addItem: (state, action) => {
      debugger;
      state.items.push(action.payload);
      saveJsonItemsToLocalStorage(state.items); // Save to localStorage
    },
    updateItem: (state, action) => {
      debugger;
      const { id, value } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        existingItem.value = value;
        saveJsonItemsToLocalStorage(state.items); // Save to localStorage
      }
    },
    deleteItem: (state, action) => {
      debugger;
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
      saveJsonItemsToLocalStorage(state.items); // Save to localStorage
    },
  },
});

export const { addItem, updateItem, deleteItem } = itemsSlice.actions;
export default itemsSlice.reducer;

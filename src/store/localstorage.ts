export enum LOCAL_STORAGE_KEYS {
  JSON_ITEMS = "JSON_ITEMS",
  DRAWINGS = "DRAWINGS",
}
export interface JsonItem {
  id: string;
  value: string;
}
export const saveJsonItemsToLocalStorage = (items: JsonItem[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEYS.JSON_ITEMS, JSON.stringify(items));
};

export const loadJsonItemsFromLocalStorage = () => {
  const data = localStorage.getItem(LOCAL_STORAGE_KEYS.JSON_ITEMS);
  debugger;
  return data;
};

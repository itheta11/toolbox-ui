const LOCAL_MODE = false;
export const APP_VERSION = import.meta.env.VITE_APP_VERSION;
const LOCAL_API_URL = "https://localhost:7031";
export const APP_BASE_URL = LOCAL_MODE
  ? LOCAL_API_URL
  : import.meta.env.VITE_APP_BASE_API_URL;

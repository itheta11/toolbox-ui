import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig((env) => {
  return {
    plugins: [react()],
    define: {
      "process.env": env,
    },
  };
});

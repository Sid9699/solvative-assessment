import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@api": "/src/api",
      "@components": "/src/components",
      "@interfaces": "/src/interfaces",
      "@pages": "/src/pages",
      "@services": "/src/services",
    },
  },
  plugins: [react()],
});

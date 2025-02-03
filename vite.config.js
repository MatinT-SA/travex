import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslint({
      failOnWarning: false, // Allows build with warnings
      failOnError: false, // Allows build with errors (not recommended)
    }),
  ],
  base: "travex"
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const isProd = process.env.NODE_ENV === "production" || process.env.MODE === "production";

export default defineConfig({
  base: isProd ? "/se_project_react/" : "/",
  plugins: [react()],
  server: {
    port: 3000,
  },
});

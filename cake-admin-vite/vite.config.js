import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/SweetCake-FullStack-Project/cake-admin-vite/",
});
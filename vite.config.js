import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default {
  plugins: [react(), svgr()],
  server: {
    proxy: {
      "/api": "http://localhost:8080",
    },
  },
  optimizeDeps: {
    exclude: ["maplibre-gl"],
  },
};

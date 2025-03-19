import { defineConfig } from "vite";
<<<<<<< HEAD
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [ react()],
});
=======
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [tailwindcss(), react()],
});
>>>>>>> 24fde69e7bb22bf0c89b2a042890d2c37cf5af81

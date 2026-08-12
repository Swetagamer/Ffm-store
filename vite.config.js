import { defineConfig } from "vite";
import { resolve } from "path";

// The Supabase URL and anon/publishable key are public client credentials
// (protected by Row Level Security), so exposing the NEXT_PUBLIC_* vars to the
// client bundle is safe. Private keys are never referenced in frontend code.
export default defineConfig({
  envPrefix: ["VITE_", "NEXT_PUBLIC_"],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        admin: resolve(__dirname, "admin.html"),
      },
    },
  },
});

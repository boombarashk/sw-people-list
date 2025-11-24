/// <reference types="vite/client" />
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
dotenv.config();

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [
      react({
        jsxRuntime: "classic",
      }),
    ],
    define: {
      ...Object.keys(env).reduce(
        (prev: Record<keyof NodeJS.ProcessEnv, string>, key: string) => {
          const sanitizedKey = key.replace(/[^a-zA-Z0-9_]/g, "_");

          prev[`process.env.${sanitizedKey}`] = JSON.stringify(env[key]);

          return prev;
        },
        {},
      ),
    },
    build: {
      rollupOptions: {
        external: ["react", "react-dom", "react/jsx-runtime"],
        output: {
          globals: {
            react: "React",
            "react-dom": "React-dom",
            "react/jsx-runtime": "react/jsx-runtime",
          },
        },
      },
    },
  };
});

import { ConfigEnv, defineConfig, loadEnv, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "@svgr/rollup";

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, ".");
  return defineConfig({
    base: "/",
    server: {
      port: 3000,
      host: "localhost",
      fs: {
        strict: false,
      },
    },
    build: {
      sourcemap: false,
      outDir: "build",
      target: ["es2020", "edge88", "firefox78", "chrome87", "safari12"],
    },
    plugins: [
      react(),
      svgr({
        svgoConfig: {
          plugins: [
            {
              name: "preset-default",
              params: {
                overrides: {
                  removeViewBox: false,
                  cleanupIds: {
                    minify: false,
                    remove: false,
                  },
                },
              },
            },
          ],
        },
      }),
    ],
  });
};

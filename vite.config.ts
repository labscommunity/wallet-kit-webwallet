import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import path from "node:path";

export default defineConfig({
  plugins: [
    dts({ insertTypesEntry: true })
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "@arweave-wallet-kit/webwallet-strategy",
      formats: ["es", "umd"],
      fileName: (format) => `index.${format}.js`
    }
  }
});

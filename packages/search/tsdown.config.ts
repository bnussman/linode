import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ["./src/search.ts"],
  dts: true,
  loader: {
    '.peggy': 'text',
   }
})

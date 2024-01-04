import { defineConfig } from 'orval';

export default defineConfig({
  v4: {
    input: './openapi.yaml',
    output: {
      target: './v4.ts',
      client: 'axios',
      headers: true,
      override: {
        mutator: {
          path: './axios.ts',
          name: 'customInstance',
        },
      },
    }
  },
});


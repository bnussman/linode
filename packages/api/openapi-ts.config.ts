import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: './openapi.json',
  output: './src/generated',
  plugins: [
    {
      name: '@hey-api/client-fetch',
      throwOnError: true,
      exportFromIndex: true,
    },
    {
      name: '@hey-api/sdk',
      responseStyle: 'data',
      exportFromIndex: true,
    },
    {
      name: 'zod',
      definitions: { name: (name) => `${name}Schema` },
      requests: { name: (name) => `${name}RequestSchema` },
      responses: { name: (name) => `${name}ResponseSchema` },
      exportFromIndex: true,
    },
    {
      name: '@tanstack/react-query',
      includeInEntry: true,
    }
  ],
});

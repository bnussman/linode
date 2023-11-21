import { defineConfig } from 'orval';

export default defineConfig({
  v4: {
    input: './openapi.yaml',
    output: {
      target: './v4.ts',
      client: 'axios',
      headers: true,
      override: {
        transformer(verb) {
          verb.override.components.responses.suffix = '';
          return verb;
        },
      },
    }
  },
});

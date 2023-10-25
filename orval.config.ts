import { defineConfig } from 'orval';

export default defineConfig({
	v4: {
		input: './openapi.yaml',
		output: './v4.ts',
	},
});

import { defineConfig } from 'orval';

export default defineConfig({
	petstore: {
		input: './petstore.yaml',
		output: './petstore.ts',
		hooks: {
			afterAllFilesWrite: 'prettier --write',
		},
	},
});

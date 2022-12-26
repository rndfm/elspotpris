import { sveltekit } from '@sveltejs/kit/vite';
import { isoImport } from 'vite-plugin-iso-import';

const config = {
	server: {
		port: 4000
	},
	plugins: [sveltekit(), isoImport()]
};

export default config;

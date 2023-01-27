import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess({
		replace: [[/process\.env\.NODE_ENV/g, JSON.stringify(process.env.NODE_ENV)]]
	}),
	kit: {
		adapter: adapter(),
		prerender: {
			enabled: true
		},
		trailingSlash: 'never'
	}
};

export default config;

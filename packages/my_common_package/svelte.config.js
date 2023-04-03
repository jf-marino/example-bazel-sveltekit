import adapter from '@sveltejs/adapter-node'
import sveltePreprocess from 'svelte-preprocess'
import { monorepoAlias, sass as sassAliases } from '../js_utils/aliases.mjs'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: sveltePreprocess({
		scss: {
      importer: [
				sassAliases({
					'@src': process.cwd() + '/src'
				})
			]
    }
	}),

	kit: {
		adapter: adapter(),
		alias: monorepoAlias()
	}
};

export default config;

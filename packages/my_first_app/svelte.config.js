import adapter from '@sveltejs/adapter-node';
import sveltePreprocess from 'svelte-preprocess';
import makeAttractionsImporter from 'attractions/importer.js'
import { nodeModulesPath } from '../js_utils/nodeModulesPath.mjs'
import { monorepoAlias, sass as sassAliases } from '../js_utils/aliases.mjs'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: sveltePreprocess({
		scss: {
      importer: [
				makeAttractionsImporter({
					nodeModulesPath: nodeModulesPath()
				}),
				sassAliases({
					'@src': process.cwd() + '/src'
				})
			]
    }
	}),

	kit: {
		alias: monorepoAlias(),
		adapter: adapter()
	}
};

export default config;

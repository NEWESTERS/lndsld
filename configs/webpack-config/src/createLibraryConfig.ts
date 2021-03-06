import { Configuration } from 'webpack';
import { WebpackConfigBuilder, WebpackConfigBuilderPlugin } from '@lndsld/config-builders';

import { BuildEnv, BuildEnvCustomization, resolveBuildEnv } from './env';
import { babelPlugin, libraryOutputPlugin, externalsPlugin } from './plugins';

interface CreateLibraryOptions extends BuildEnvCustomization {
	customizeWebpack?: WebpackConfigBuilderPlugin<BuildEnv>;
}

function createLibraryConfig({ customizeWebpack, ...options }: CreateLibraryOptions = {}): Configuration {
	const env = resolveBuildEnv(options);

	const builder = new WebpackConfigBuilder(env);

	builder
		.merge({
			entry: env.entryPath,
			mode: 'production',
			devtool: 'source-map'
		})
		.apply(libraryOutputPlugin)
		.apply(babelPlugin)
		.apply(externalsPlugin);

	if (customizeWebpack) {
		builder.apply(customizeWebpack);
	}

	return builder.config;
}

export default createLibraryConfig;

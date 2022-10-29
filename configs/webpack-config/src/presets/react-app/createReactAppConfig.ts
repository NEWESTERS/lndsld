import path from 'path';
import { Configuration } from 'webpack';
import { WebpackConfigBuilder, WebpackConfigBuilderPlugin } from '@lndsld/config-builders';

import {
	DevServerOptions,
	devServerPlugin,
	htmlPlugin,
	HtmlPluginOptions,
	swcPlugin,
	SwcPluginOptions,
	SwcReactOptions
} from '../../plugins';
import { getTsCompilerOptions } from '../../env';

interface VanillaConfigEnv extends SwcPluginOptions, HtmlPluginOptions, DevServerOptions {}

interface CreateVanillaConfigOptions
	extends Partial<HtmlPluginOptions>,
		Partial<DevServerOptions>,
		Partial<SwcReactOptions> {
	tsConfigPath?: string;
	entryPath?: string;
	outPath?: string;
	customize?: WebpackConfigBuilderPlugin<VanillaConfigEnv>;
}

function createVanillaAppConfig(
	options: CreateVanillaConfigOptions
): (env: Record<string, string>, argv: Record<string, string>) => Configuration {
	return (env, argv) => {
		const {
			entryPath = path.resolve('src', 'index.tsx'),
			outPath = path.resolve('build'),
			tsConfigPath = path.resolve('./tsconfig.json'),
			publicUrl = '/',
			indexHtmlPath = path.resolve('public', 'index.html'),
			useHttps = false,
			devServerPort = 3000,
			customize,
			fastRefresh
		} = options;

		const builder = new WebpackConfigBuilder<VanillaConfigEnv>({
			compilerOptions: getTsCompilerOptions(tsConfigPath),
			reactOptions: {
				fastRefresh
			},
			publicUrl,
			indexHtmlPath,
			useHttps,
			devServerPort
		});

		const isProduction = argv.mode === 'production';

		builder
			.merge({
				entry: entryPath,
				mode: isProduction ? 'production' : 'development',
				output: {
					path: outPath,
					publicPath: 'auto',
					clean: isProduction
				}
			})
			.apply(swcPlugin)
			.apply(htmlPlugin);

		if (!isProduction) {
			builder.apply(devServerPlugin);
		}

		if (customize) {
			builder.apply(customize);
		}

		return builder.config;
	};
}

export default createVanillaAppConfig;

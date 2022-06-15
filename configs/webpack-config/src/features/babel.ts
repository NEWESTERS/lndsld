import { BabelConfig } from '../types';
import { BabelConfigBuilder, WebpackConfigBuilderPlugin } from '../utils';

export interface ApplyBabelOptions {
	customizeBabel?: BabelConfig | ((config: BabelConfig) => BabelConfig);
	extensions?: string[];
}

function createExtensionRegExp(extensions: string[]): RegExp {
	return new RegExp(`(${extensions.map((ext) => `\\${ext}`).join('|')})$`);
}

export function applyBabel(options: ApplyBabelOptions): WebpackConfigBuilderPlugin {
	const { customizeBabel, extensions = ['.ts', '.js'] } = options;

	const babelConfigBuilder = new BabelConfigBuilder();

	babelConfigBuilder
		.addPreset([require.resolve('@babel/preset-env'), { targets: { browsers: 'last 2 versions' } }])
		.addPreset(require.resolve('@babel/preset-typescript'));

	if (customizeBabel) {
		babelConfigBuilder.customize(customizeBabel);
	}

	return (builder) => {
		builder
			.addRule({
				test: createExtensionRegExp(extensions),
				loader: require.resolve('babel-loader'),
				options: {
					babelrc: false,
					...babelConfigBuilder.config
				}
			})
			.merge({
				resolve: {
					extensions
				}
			});
	};
}

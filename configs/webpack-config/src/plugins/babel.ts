import {
	BabelConfigBuilder,
	BabelConfigBuilderPlugin,
	WebpackConfigBuilderPlugin
} from '@lndsld/config-builders';

export interface ApplyBabelOptions {
	customizeBabel?: BabelConfigBuilderPlugin<ApplyBabelOptions>;
	extensions?: string[];
}

function createExtensionRegExp(extensions: string[]): RegExp {
	return new RegExp(`(${extensions.map((ext) => `\\${ext}`).join('|')})$`);
}

export const babelPlugin: WebpackConfigBuilderPlugin<ApplyBabelOptions> = (builder) => {
	const { customizeBabel, extensions = ['.ts', '.js'] } = builder.env;

	const babelConfigBuilder = new BabelConfigBuilder(builder.env);

	babelConfigBuilder
		.addPreset([require.resolve('@babel/preset-env'), { targets: { browsers: 'last 2 versions' } }])
		.addPreset(require.resolve('@babel/preset-typescript'));

	if (customizeBabel) {
		babelConfigBuilder.apply(customizeBabel);
	}

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

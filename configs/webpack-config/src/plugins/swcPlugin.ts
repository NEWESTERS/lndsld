import { WebpackConfigBuilderPlugin } from '@lndsld/config-builders';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

import { TsCompilerOptions } from '../types';

export interface SwcReactOptions {
	fastRefresh?: boolean;
}

export interface SwcPluginOptions {
	compilerOptions: TsCompilerOptions;
	reactOptions?: SwcReactOptions;
}

const TS_REGEX = /\.(t|j)sx?$/;

const swcPlugin: WebpackConfigBuilderPlugin<SwcPluginOptions> = (builder) => {
	const {
		compilerOptions: { experimentalDecorators, jsx, emitDecoratorMetadata },
		reactOptions
	} = builder.env;

	builder.merge({
		resolve: {
			modules: ['node_modules'],
			extensions: ['.tsx', '.ts', '.js', '.jsx']
		}
	});

	const useReact = reactOptions !== undefined;

	const react = useReact
		? {
				runtime: jsx === 'react-jsx' ? 'automatic' : 'classic',
				refresh: reactOptions?.fastRefresh
		  }
		: undefined;

	builder.addRule({
		test: TS_REGEX,
		use: {
			loader: require.resolve('swc-loader'),
			options: {
				jsc: {
					parser: {
						syntax: 'typescript',
						tsx: useReact,
						decorators: experimentalDecorators
					},
					transform: {
						react,
						legacyDecorator: experimentalDecorators,
						decoratorMetadata: emitDecoratorMetadata
					}
				}
			}
		}
	});

	if (reactOptions?.fastRefresh) {
		builder.addPlugin(new ReactRefreshWebpackPlugin({ overlay: false }));
	}
};

export default swcPlugin;

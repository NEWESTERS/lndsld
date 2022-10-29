import { WebpackConfigBuilderPlugin } from '@lndsld/config-builders';

import { TsCompilerOptions } from '../types';

export interface SwcPluginOptions {
	compilerOptions: TsCompilerOptions;
	useReact: boolean;
}

const TS_REGEX = /\.(t|j)sx?$/;

const swcPlugin: WebpackConfigBuilderPlugin<SwcPluginOptions> = (builder) => {
	const {
		compilerOptions: { experimentalDecorators, jsx, emitDecoratorMetadata },
		useReact
	} = builder.env;

	const react = useReact
		? {
				runtime: jsx === 'react-jsx' ? 'automatic' : 'classic',
				refresh: true
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
};

export default swcPlugin;

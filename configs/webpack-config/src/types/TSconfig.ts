export type JsxRuntimeType = 'react-jsx' | 'react';

export interface TsCompilerOptions {
	baseUrl?: string;
	jsx?: JsxRuntimeType;
	paths?: Record<string, string[]>;
	isolatedModules?: boolean;
	experimentalDecorators?: boolean;
	emitDecoratorMetadata?: boolean;
}

interface TSConfig {
	extends?: string;
	compilerOptions?: TsCompilerOptions;
}

export default TSConfig;

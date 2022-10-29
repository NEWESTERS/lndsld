import ts from 'typescript';
import path from 'path';

import { TsCompilerOptions, TSConfig } from '../types';

function resolveExtends(extendsPath: string, sourcePath: string): string {
	return extendsPath.startsWith('.')
		? path.resolve(path.dirname(sourcePath), extendsPath)
		: require.resolve(extendsPath);
}

export function getTsCompilerOptions(tsConfigPath: string): TsCompilerOptions {
	const config: TSConfig | undefined = ts.readConfigFile(tsConfigPath, ts.sys.readFile).config;

	if (!config) {
		throw new Error(`tsconfig.json at path "${tsConfigPath}" not found`);
	}

	let compilerOptions = config.compilerOptions ?? {};

	if (config.extends) {
		compilerOptions = {
			...getTsCompilerOptions(resolveExtends(config.extends, tsConfigPath)),
			...compilerOptions
		};
	}

	return compilerOptions;
}

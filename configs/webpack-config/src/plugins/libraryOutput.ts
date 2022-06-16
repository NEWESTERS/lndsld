import path from 'path';

import { PackageJson } from '../types';
import { WebpackConfigBuilderPlugin } from '../utils';

export interface ApplyLibraryOutputOptions {
	packageJson: PackageJson;
	rootPath: string;
	outputPath?: string;
	outputFileName?: string;
	libraryType?: string;
}

function getOutputPath(packageJson: PackageJson, rootPath: string): string {
	return packageJson.main
		? path.dirname(path.resolve(rootPath, packageJson.main))
		: path.resolve(rootPath, 'lib');
}

function getOutputFileName(packageJson: PackageJson, rootPath: string): string | undefined {
	return packageJson.main
		? path.basename(path.resolve(rootPath, packageJson.main))
		: path.resolve(rootPath, 'index.js');
}

export const libraryOutputPlugin: WebpackConfigBuilderPlugin<ApplyLibraryOutputOptions> = (builder) => {
	const {
		packageJson,
		rootPath,
		outputPath = getOutputPath(packageJson, rootPath),
		outputFileName = getOutputFileName(packageJson, rootPath),
		libraryType = 'umd'
	} = builder.env;

	builder.merge({
		output: {
			path: outputPath,
			filename: outputFileName,
			globalObject: 'this',
			library: {
				name: packageJson.name,
				type: libraryType
			},
			clean: true
		}
	});
};

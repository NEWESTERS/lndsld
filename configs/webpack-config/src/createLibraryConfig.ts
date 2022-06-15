import path from 'path';
import { Configuration } from 'webpack';

import {
	applyBabel,
	ApplyBabelOptions,
	applyExternals,
	ApplyExternalsOptions,
	applyLibraryOutput,
	ApplyLibraryOutputOptions
} from './features';
import { getPackageJson, WebpackConfigBuilder } from './utils';

interface CreateLibraryOptions
	extends ApplyBabelOptions,
		Omit<ApplyExternalsOptions, 'packageJson'>,
		Omit<ApplyLibraryOutputOptions, 'packageJson' | 'rootPath'> {
	customizeWebpack?: Configuration | ((config: Configuration) => Configuration);
	entryPath?: string;
	rootPath?: string;
}

function createLibraryConfig(options: CreateLibraryOptions = {}): Configuration {
	const {
		customizeWebpack,
		rootPath = path.resolve('.'),
		entryPath = path.resolve(rootPath, 'src', 'index.ts')
	} = options;
	const packageJson = getPackageJson(path.resolve(rootPath, 'package.json'));
	const builder = new WebpackConfigBuilder();

	builder
		.merge({
			entry: entryPath,
			mode: 'production',
			devtool: 'source-map'
		})
		.apply(applyLibraryOutput({ ...options, packageJson, rootPath }))
		.apply(applyBabel(options))
		.apply(applyExternals({ packageJson }));

	if (customizeWebpack) {
		builder.customize(customizeWebpack);
	}

	return builder.config;
}

export default createLibraryConfig;

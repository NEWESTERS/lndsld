import path from 'path';

import { ApplyBabelOptions, ApplyExternalsOptions, ApplyLibraryOutputOptions } from '../plugins';
import getPackageJson from './getPackageJson';

export type BuildEnv = ApplyBabelOptions &
	ApplyExternalsOptions &
	ApplyLibraryOutputOptions & {
		entryPath: string;
	};

export type BuildEnvCustomization = Partial<Omit<BuildEnv, 'packageJson'>>;

function resolveBuildEnv(customization: BuildEnvCustomization): BuildEnv {
	const { rootPath = path.resolve('.'), entryPath = path.resolve(rootPath, 'src', 'index.ts') } =
		customization;

	const packageJson = getPackageJson(path.resolve(rootPath, 'package.json'));

	return {
		...customization,
		rootPath,
		entryPath,
		packageJson
	};
}

export default resolveBuildEnv;

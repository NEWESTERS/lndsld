import { PackageJson } from '../types';
import { WebpackConfigBuilderPlugin } from '../utils';

export interface ApplyExternalsOptions {
	packageJson: PackageJson;
}

export function applyExternals(options: ApplyExternalsOptions): WebpackConfigBuilderPlugin {
	const { packageJson } = options;

	return (builder) => {
		if (packageJson.peerDependencies) {
			builder.merge({
				externals: Object.keys(packageJson.peerDependencies)
			});
		}
	};
}

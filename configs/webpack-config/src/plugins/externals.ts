import { PackageJson } from '../types';
import { WebpackConfigBuilderPlugin } from '../utils';

export interface ApplyExternalsOptions {
	packageJson: PackageJson;
}

export const externalsPlugin: WebpackConfigBuilderPlugin<ApplyExternalsOptions> = (builder) => {
	const { packageJson } = builder.env;

	if (packageJson.peerDependencies) {
		builder.merge({
			externals: Object.keys(packageJson.peerDependencies)
		});
	}
};

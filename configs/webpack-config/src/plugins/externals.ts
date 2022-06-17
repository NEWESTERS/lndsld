import { WebpackConfigBuilderPlugin } from '@lndsld/config-builders';

import { PackageJson } from '../types';

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

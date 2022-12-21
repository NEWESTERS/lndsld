import { ICommandProvider } from '../../interfaces';
import { PackageJson } from '../../models';
import { ConfigProvider, ConfigProviderOptions } from '../ConfigProvider';

/**
 * Options to create {@link PackageJsonProvider}.
 * 
 * @public
 */
export interface PackageJsonProviderOptions extends Omit<ConfigProviderOptions, 'fileName'> {}

/**
 * Provides `package.json`.
 * 
 * @public
 */
export class PackageJsonProvider extends ConfigProvider<PackageJson> implements ICommandProvider {
	public static fileName: string = 'package.json';

	public constructor(options: PackageJsonProviderOptions) {
		super({ ...options, fileName: PackageJsonProvider.fileName });
	}

	public getCommand(taskName: string): string | undefined {
		return this.data?.scripts?.[taskName];
	}
}

import { ICommandProvider, IConfigProvider, IDependencyProvider } from '../../interfaces';
import { OrcConfig, OrcTask, PackageJson } from '../../models';
import { ConfigProvider, ConfigProviderOptions } from '../ConfigProvider';

/**
 * Options to create {@link OrcConfigProvider}.
 *
 * @public
 */
export interface OrcConfigProviderOptions extends Omit<ConfigProviderOptions, 'fileName'> {
	packageJsonProvider?: IConfigProvider<PackageJson>;
}

/**
 * Provides configuration for `orc` from all available configuration files.
 *
 * @public
 */
export class OrcConfigProvider
	extends ConfigProvider<OrcConfig>
	implements IDependencyProvider, ICommandProvider
{
	private _packageJsonProvider?: IConfigProvider<PackageJson>;

	public static fileName: string = 'orc.config.json';

	public constructor({ packageJsonProvider, ...configProviderOptions }: OrcConfigProviderOptions) {
		super({ ...configProviderOptions, fileName: OrcConfigProvider.fileName });
		this._packageJsonProvider = packageJsonProvider;
	}

	public get data(): OrcConfig | undefined {
		return this._packageJsonProvider?.data?.orc ?? super.data;
	}

	private _getNpmScript(taskName: string): string | undefined {
		return this._packageJsonProvider?.data?.scripts?.[taskName];
	}

	public getTask(taskName: string): OrcTask | undefined {
		let task = this.data?.scripts?.[taskName];

		if (task !== undefined && task.command !== undefined) {
			return task;
		}

		const npmScript = this._getNpmScript(taskName);

		if (npmScript !== undefined) {
			task = {
				...task,
				command: npmScript
			};
		}

		return task;
	}

	public getDependencies(taskName: string): string[] {
		return this.getTask(taskName)?.dependsOn ?? [];
	}

	public getCommand(taskName: string): string | undefined {
		return this.getTask(taskName)?.command;
	}
}

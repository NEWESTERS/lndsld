import { CommandModule } from 'yargs';
import yargs from 'yargs/yargs';

import { ITaskRunner } from '../../interfaces';

/**
 * Options to create {@link OrcCli}.
 *
 * @public
 */
export interface OrcCliOptions {
	runner: ITaskRunner;
}

/**
 * CLI service for `orc`.
 *
 * @public
 */
export class OrcCli {
	private _runner: ITaskRunner;

	public constructor({ runner }: OrcCliOptions) {
		this._runner = runner;
	}

	private get _runCommand(): CommandModule {
		return {
			command: 'run [scriptName]',
			describe: 'Run script',
			builder: (command) => command.positional('scriptName', { describe: 'Name of script to run' }),
			handler: async (argv) => {
				console.log(`Running ${argv.scriptName}`);

				const startTime = performance.now();

				await this._runner.run(argv.scriptName as string);

				const endTime = performance.now();

				console.log(`"${argv.scriptName}" finished in ${Math.round(endTime - startTime)}ms`);
			}
		};
	}

	public async start(argv: string[]): Promise<void> {
		await yargs(argv.slice(2)).scriptName('orc').command(this._runCommand).help().argv;
	}
}

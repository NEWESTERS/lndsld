import childProcess from 'node:child_process';
import path from 'node:path';

import { ICommandProvider, IPathFinder, ITaskRunner, TaskRunOptions } from '../../interfaces';

/**
 * Options to create {@link ShellRunner}.
 *
 * @public
 */
export interface ShellRunnerOptions {
	commandProvider: ICommandProvider;
	pathFinder: IPathFinder;
}

/**
 * Shell command runner.
 *
 * @public
 */
export class ShellRunner implements ITaskRunner {
	private _environment: ICommandProvider;
	private _pathFinder: IPathFinder;

	public constructor({ commandProvider, pathFinder }: ShellRunnerOptions) {
		this._environment = commandProvider;
		this._pathFinder = pathFinder;
	}

	private _getExecEnv({ cwd, env }: TaskRunOptions = {}): NodeJS.ProcessEnv {
		const paths = [...this._pathFinder.findAll('node_modules/.bin', { startPath: cwd })];

		if (env?.PATH) {
			paths.push(env.PATH);
		}

		return {
			...env,
			PATH: paths.join(path.delimiter)
		};
	}

	public run(taskName: string, options?: TaskRunOptions): Promise<void> {
		const command = this._environment.getCommand(taskName);

		if (command === undefined) {
			throw new Error(`Task ${taskName} is not specified`);
		}

		return new Promise((resolve, reject) => {
			if (command === '') {
				resolve();
			}

			childProcess.exec(
				command,
				{
					env: this._getExecEnv(options)
				},
				(error, stdout) => {
					console.log(stdout);

					if (error) {
						reject(error);
						return;
					}

					resolve();
				}
			);
		});
	}
}

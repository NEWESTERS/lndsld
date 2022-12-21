import { IDependencyProvider, ITaskRunner, TaskRunOptions } from '../../interfaces';

/**
 * Options to create {@link Orchestrator}.
 * 
 * @public
 */
export interface OrchestratorOptions {
	dependencyProvider: IDependencyProvider;
	taskRunner: ITaskRunner;
}

/**
 * Task orchestrator.
 *
 * @public
 */
export class Orchestrator implements ITaskRunner {
	private _environment: IDependencyProvider;
	private _runner: ITaskRunner;
	private _startedTasks: Map<string, Promise<void>> = new Map();

	public constructor({ dependencyProvider, taskRunner }: OrchestratorOptions) {
		this._environment = dependencyProvider;
		this._runner = taskRunner;
	}

	private async _runScriptDependencies(taskName: string, options?: TaskRunOptions): Promise<void> {
		const scriptDependencies = this._environment.getDependencies(taskName);

		if (scriptDependencies && scriptDependencies.length > 0) {
			await Promise.all(scriptDependencies.map((taskName) => this.run(taskName, options)));
		}
	}

	public async _runUniqueScript(taskName: string, options?: TaskRunOptions): Promise<void> {
		let task = this._startedTasks.get(taskName);

		if (!task) {
			task = this._runner.run(taskName, options);
			this._startedTasks.set(taskName, task);
		}

		await task;
	}

	/**
	 * Run script and all it's dependencies recursively.
	 *
	 * @param taskName - name of script
	 * @returns `Promise` that resolves when script is finished
	 */
	public async run(taskName: string, options?: TaskRunOptions): Promise<void> {
		await this._runScriptDependencies(taskName);

		await this._runUniqueScript(taskName, options);
	}
}

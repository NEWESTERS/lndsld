/**
 * Options of {@link ITaskRunner}.
 * 
 * @public
 */
export interface TaskRunOptions {
	/**
	 * The directory to run task.
	 *
	 * @defaultValue `process.cwd()`
	 */
	cwd?: string;
	/** Environment variables for task execution. */
	env?: Record<string, string>
}

/**
 * Definition of service, that can run task with specified name.
 * 
 * @public
 */
export interface ITaskRunner {
	/** Asynchronously run task with specified name. */
	run: (taskName: string, options?: TaskRunOptions) => Promise<void>;
}

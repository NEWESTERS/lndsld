/**
 * Definition of service, that can provide task dependencies.
 * 
 * @public
 */
export interface IDependencyProvider {
	/** Get dependencies of task with name `taskName`. */
	getDependencies: (taskName: string) => string[];
}

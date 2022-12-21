/**
 * Definition of service, that can provide command by it's task name.
 * 
 * @public
 */
export interface ICommandProvider {
	/** Get command by task name. */
	getCommand: (taskName: string) => string | undefined;
}

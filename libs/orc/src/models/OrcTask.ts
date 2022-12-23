/**
 * Definition of `orc` task configuration.
 * 
 * @public
 */
export interface OrcTask {
	/**
	 * Command to execute.
	 *
	 * @defaultValue script with the same key from `package.json`
	 */
	command?: string;
	/**
	 * Dependencies of command,
	 * which should be executed before this command.
	 */
	dependsOn?: string[];
}

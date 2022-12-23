/**
 * Options of {@link IPathFinder}.
 * 
 * @public
 */
export interface PathFinderOptions {
	/**
	 * The directory to start from.
	 *
	 * @defaultValue `process.cwd()`
	 */
	startPath?: string;
	/**
	 * The path to stop search.
	 *
	 * @defaultValue `path.parse(startPath).root`
	 */
	stopPath?: string;
}

/**
 * Definition of service, that can resolve file or directory by it's name.
 * 
 * @public
 */
export interface IPathFinder {
	/**
	 * Find all files or directories by walking up parent directories.
	 *
	 * @param name - name of file or directory to find
	 */
	findAll(name: string, options?: PathFinderOptions): Generator<string, void, void>;
	/**
	 * Find first file or directory by walking up parent directories.
	 *
	 * @param name - name of file or directory to find
	 */
	findFirst(name: string, options?: PathFinderOptions): string | undefined;
}

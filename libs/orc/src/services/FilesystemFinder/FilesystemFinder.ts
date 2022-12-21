import path from 'node:path';
import fs from 'node:fs';

import { PathFinderOptions, IPathFinder } from '../../interfaces';

/**
 * Finds file or directory recursively on filesystem.
 * 
 * @public
 */
export class FilesystemFinder implements IPathFinder {
	public *findAll(name: string, options?: PathFinderOptions | undefined): Generator<string, void, void> {
		const startPath = options?.startPath ?? process.cwd();
		const stopPath = options?.stopPath ?? path.parse(startPath).root;

		let basePath = startPath;

		while(true) {
			const resultPath = path.resolve(basePath, name);
			
			if(fs.existsSync(resultPath)) {
				yield resultPath;
			}

			if(basePath === stopPath) {
				break;
			}

			basePath = path.dirname(basePath)
		}
	}

	public findFirst(name: string, options?: PathFinderOptions | undefined): string | undefined {
		const result = this.findAll(name, options).next();

		return !result.done ? result.value : undefined;
	}
}

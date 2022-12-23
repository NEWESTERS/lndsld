import fs from 'node:fs';

import { IReader } from '../../interfaces';

/**
 * Reader for `json` files.
 * 
 * @public
 */
export class JsonFileReader implements IReader {
	public readSync<T = unknown>(path: string): T {
		return JSON.parse(fs.readFileSync(path).toString());
	}
}

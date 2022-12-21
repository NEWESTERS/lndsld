/**
 * Definition of service, that can read something by path.
 * 
 * @public
 */
export interface IReader {
	/** Synchronously read something by path. */
	readSync<T = unknown>(path: string): T;
}

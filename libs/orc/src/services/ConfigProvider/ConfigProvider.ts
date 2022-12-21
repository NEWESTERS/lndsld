import { IConfigProvider, IPathFinder, IReader } from '../../interfaces';

/**
 * Options to create {@link ConfigProvider}.
 * 
 * @public
 */
export interface ConfigProviderOptions {
	pathFinder: IPathFinder;
	reader: IReader;
	fileName: string;
}

/**
 * Provides configuration by filename.
 * 
 * @public
 */
export class ConfigProvider<T> implements IConfigProvider<T> {
	private _pathFinder: IPathFinder;
	private _reader: IReader;
	public readonly fileName: string;

	private _path: string | undefined;
	public get path(): string | undefined {
		if (this._path === undefined) {
			this._path = this._pathFinder.findFirst(this.fileName);
		}

		return this._path;
	}

	private _data: T | undefined;
	public get data(): T | undefined {
		if (this.path === undefined) {
			return undefined;
		}

		if (this._data === undefined) {
			this._data = this._reader.readSync<T>(this.path);
		}

		return this._data;
	}

	public constructor({ pathFinder, reader, fileName }: ConfigProviderOptions) {
		this._pathFinder = pathFinder;
		this._reader = reader;
		this.fileName = fileName;
	}
}

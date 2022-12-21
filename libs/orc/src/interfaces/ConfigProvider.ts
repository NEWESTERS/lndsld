/**
 * Definition of service, that can provide some utility configuration.
 * 
 * @public
 */
export interface IConfigProvider<T> {
	/** Configuration content. */
	data: T | undefined;
}

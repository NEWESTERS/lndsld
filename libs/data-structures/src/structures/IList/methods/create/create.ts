import type IList from '../../IList';

/** Create new `IList` */
function create<T>(...parameters: T[]): IList<T> {
	return parameters;
}

export default create;

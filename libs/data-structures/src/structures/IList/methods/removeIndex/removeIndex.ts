import type IList from '../../IList';

/** Remove item with specified index from `IList` */
function removeIndex(index: number): <T>(list: IList<T>) => IList<T> {
	return (list) => [...list.slice(0, index), ...list.slice(index + 1)];
}

export default removeIndex;

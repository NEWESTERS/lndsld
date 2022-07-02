import { Transform } from '@lndsld/fp';

import type IList from '../../IList';

/** Sort `IList` with specified comparator */
function sort<A>(comparator: (itemA: A, itemB: A) => number): Transform<IList<A>> {
	return (list) => [...list].sort(comparator);
}

export default sort;

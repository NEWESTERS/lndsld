import { Predicate, Transform, TypeGuard } from '@lndsld/fp';

import type IList from '../../IList';

/** Filter `IList` by predicate  */
function filter<A, B extends A>(predicate: TypeGuard<A, B>): Transform<IList<A>, IList<B>>;
function filter<A>(predicate: Predicate<A>): Transform<IList<A>, IList<A>>;
function filter<A>(predicate: Predicate<A>): Transform<IList<A>, IList<A>> {
	return (list) => list.filter(predicate);
}

export default filter;

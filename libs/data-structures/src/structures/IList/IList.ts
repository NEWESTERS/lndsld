import { Predicate, Transform, TypeGuard } from '@lndsld/fp';

import { IStack } from '../IStack';

type IList<T = unknown> = IStack<T>;

declare namespace IList {
	export type InferValue<L> = IStack.InferValue<L>;

	export interface API extends IStack.API {
		create<T>(...parameters: T[]): IList<T>;

		removeIndex(index: number): <T>(list: IList<T>) => IList<T>;

		filter: {
			<A, B extends A>(predicate: TypeGuard<A, B>): Transform<
				IList<A>,
				IList<B>
			>;
			<A>(predicate: Predicate<A>): Transform<IList<A>, IList<A>>;
		};

		sort<A>(
			comparator: (itemA: A, itemB: A) => number
		): Transform<IList<A>>;
	}
}

const IList = {
	...IStack,

	create: (...parameters) => parameters,

	removeIndex: (index) => (list) =>
		[...list.slice(0, index), ...list.slice(index + 1)],

	filter: (predicate: any) => (list: any) => list.filter(predicate),

	sort: (comparator) => (list) => [...list].sort(comparator),
} as IList.API;

export default IList;

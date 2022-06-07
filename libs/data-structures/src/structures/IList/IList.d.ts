import { Predicate, Transform, TypeGuard } from '@ts-essentials/fp';

import { IStack } from '../IStack';

type IList<T = unknown> = IStack<T>;

declare namespace IList {
	export type InferValue<L> = IStack.InferValue<L>;

	export interface API extends IStack.API {
		removeIndex(index: number): <T>(list: IList<T>) => IList<T>;

		filter: {
			<A, B extends A>(predicate: TypeGuard<A, B>): Transform<
				IList<A>,
				IList<B>
			>;
			<A>(predicate: Predicate<A>): Transform<IList<A>, IList<A>>;
		};
	}
}

declare const IList: IList.API;

export default IList;

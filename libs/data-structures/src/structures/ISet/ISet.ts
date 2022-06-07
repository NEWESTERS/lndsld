import { Predicate, Transform } from '@lndsld/fp';

import { hash } from '../../utils';
import { IDictionary } from '../IDictionary';
import { IList } from '../IList';

type ISet<T = unknown> = Record<string, T>;

declare namespace ISet {
	export type InferValue<S> = S extends ISet<infer T> ? T : never;

	export interface API {
		create<T>(...items: T[]): ISet<T>;

		add<T>(item: T): <T2>(set: ISet<T2>) => ISet<T2 | T>;

		remove: <T>(item: T) => Transform<ISet<T>>;

		has(item: any): (set: ISet) => boolean;

		fromList<T>(list: IList<T>): ISet<T>;

		toList<T>(set: ISet<T>): IList<T>;

		getLength(set: ISet<unknown>): number;

		isEmpty(set: ISet<unknown>): boolean;

		concat<A>(setA: ISet<A>): <B>(setB: ISet<B>) => ISet<A | B>;

		exclude<A>(exclusion: ISet<A>): (set: ISet<A>) => ISet<A>;

		map<A, B>(callback: (item: A) => B): (set: ISet<A>) => ISet<B>;

		find<A>(predicate: Predicate<A>): Transform<ISet<A>, A | undefined>;
	}
}

const ISet = {
	create: (...items) => {
		let set: IDictionary = IDictionary.create();

		for (const item of items) {
			set = ISet.add(item)(set);
		}

		return set;
	},

	add: (item) => IDictionary.set(hash(item), item),

	remove: (item) => IDictionary.removeKey(hash(item)),

	has: (item) => (set) => set[hash(item)] !== undefined,

	fromList: (list) => ISet.create(...list),

	toList: IDictionary.toList,

	getLength: IDictionary.getLength,

	isEmpty: IDictionary.isEmpty,

	concat: IDictionary.concat,

	exclude: (exclusion) => (set) => {
		let newSet = set;

		for (const item of ISet.toList(exclusion)) {
			newSet = ISet.remove(item)(newSet);
		}

		return newSet;
	},

	map: (callback) => (set) => {
		let newSet = ISet.create();

		for (const item of ISet.toList(set)) {
			newSet = ISet.add(callback(item))(newSet);
		}

		return newSet;
	},

	find: (predicate) => (set) => {
		for (const item of ISet.toList(set)) {
			if (predicate(item)) {
				return item;
			}
		}

		return;
	},
} as ISet.API;

export default ISet;

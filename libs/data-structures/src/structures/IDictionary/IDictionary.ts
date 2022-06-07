import { Predicate, Transform, TypeGuard } from '@lndsld/fp';

import { IRecord } from '../IRecord';
import { IList } from '../IList';
import { AnyKey } from '../../types';

type IDictionary<T = unknown> = Record<AnyKey, T>;

declare namespace IDictionary {
	export type InferValue<C> = C extends IDictionary<infer T> ? T : never;

	export interface API {
		create<T>(): IDictionary<T>;

		set<V>(
			key: AnyKey,
			value: V
		): <T>(
			dictionary: IDictionary<T>
		) => V extends T ? IDictionary<T> : IDictionary<V | T>;

		modify<T>(
			key: AnyKey,
			callback: Transform<T>
		): Transform<IDictionary<T>>;

		removeKey(
			key: AnyKey
		): <T>(dictionary: IDictionary<T>) => IDictionary<T>;

		map<A, B>(
			callback: (item: A, key: AnyKey) => B
		): Transform<IDictionary<A>, IDictionary<B>>;

		toList<T>(dictionary: IDictionary<T>): IList<T>;

		getLength(dictionary: IDictionary): number;

		isEmpty(dictionary: IDictionary): boolean;

		get(key: AnyKey): <T>(dictionary: IDictionary<T>) => T | undefined;

		getMany(keys: AnyKey[]): <T>(dictionary: IDictionary<T>) => T[];

		filter: {
			<A, B extends A>(predicate: TypeGuard<A, B>): Transform<
				IDictionary<A>,
				IDictionary<B>
			>;
			<A>(predicate: Predicate<A>): Transform<
				IDictionary<A>,
				IDictionary<A>
			>;
		};

		concat<A>(
			dictionaryA: IDictionary<A>
		): <B>(dictionaryB: IDictionary<B>) => IDictionary<A | B>;
	}
}

const IDictionary = {
	...IRecord,

	create: () => ({}),

	map: (callback) => (dictionary) => {
		const mappedDictionary = IDictionary.create();

		for (const key of Object.keys(dictionary)) {
			mappedDictionary[key] = callback(dictionary[key], key);
		}

		return mappedDictionary;
	},

	toList: Object.values,

	getLength: (dictionary) => Object.keys(dictionary).length,

	isEmpty: (dictionary) => IDictionary.getLength(dictionary) === 0,

	filter: (predicate: any) => (dictionary: any) => {
		const filteredDictionary = IDictionary.create();
		let isAllPass = true;

		for (const key in dictionary) {
			if (predicate(dictionary[key])) {
				filteredDictionary[key] = dictionary[key];
			} else {
				isAllPass = false;
			}
		}

		return isAllPass ? dictionary : filteredDictionary;
	},

	getMany: (keys) => (dictionary) =>
		keys.map((key) => IDictionary.get(key)(dictionary)),

	concat: (dictionaryA) => (dictionaryB) => ({
		...dictionaryA,
		...dictionaryB,
	}),
} as IDictionary.API;

export default IDictionary;

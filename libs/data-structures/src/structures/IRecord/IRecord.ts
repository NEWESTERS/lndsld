import { Transform } from '@lndsld/fp';

import { AnyKey } from '../../types';

declare namespace IRecord {
	export type AddProp<R extends {}, K extends AnyKey, V> = K extends keyof R ? never : R & Record<K, V>;

	export type OverrideProp<R extends {}, K extends AnyKey, V> = AddProp<Omit<R, K>, K, V>;

	export interface API {
		set<K extends AnyKey, V>(
			key: K,
			value: V
		): <R extends {}>(
			record: R
		) => K extends keyof R
			? V extends R[K]
				? R
				: Readonly<OverrideProp<R, K, V>>
			: Readonly<AddProp<R, K, V>>;

		modify<K extends AnyKey, V1, V2>(
			key: K,
			callback: Transform<V1, V2>
		): <R extends Record<K, V1>>(record: R) => V1 extends V2 ? R : Readonly<OverrideProp<R, K, V2>>;

		removeKey<K extends AnyKey>(
			key: K
		): <R extends {}>(record: R) => K extends keyof R ? Readonly<Omit<R, K>> : R;

		get<K extends AnyKey>(key: K): <R extends { [key in K]: unknown }>(record: R) => R[K];

		getKeys<T extends AnyKey>(record: Record<T, unknown>): T[];

		hasKey<T extends AnyKey>(key: T): (record: object) => record is Record<T, unknown>;

		isRecord(value: unknown): value is Record<AnyKey, unknown>;
	}
}

const IRecord = {
	get: (key) => (record) => record[key],

	set: (key, value) => (record) => {
		// @ts-ignore
		if (record[key] === value) {
			return record;
		}

		return {
			...record,
			[key]: value
		};
	},

	modify: (key, callback) => (record) =>
		// @ts-ignore
		IRecord.set(key, callback(record[key]))(record),

	removeKey: (key) => (record) => {
		// @ts-ignore
		if (record[key] === undefined) {
			return record;
		}

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { [key]: removedKey, ...newRecord } = record;

		return newRecord;
	},

	getKeys: Object.keys,

	hasKey:
		<T extends AnyKey>(key: T) =>
		(record): record is Record<T, unknown> =>
			key in record,

	isRecord: (value): value is Record<AnyKey, unknown> => typeof value === 'object' && value !== null
} as IRecord.API;

export default IRecord;

import { AnyKey } from '../../types';
import * as methods from './methods';

type IRecord<K extends AnyKey = never, V = unknown> = Readonly<Record<K, V>>;

declare namespace IRecord {
	export type AddProperty<R extends IRecord, K extends AnyKey, V> = K extends keyof R
		? never
		: R & IRecord<K, V>;

	export type OverrideProperty<R extends IRecord, K extends AnyKey, V> = AddProperty<Omit<R, K>, K, V>;
}

const IRecord = methods;

export default IRecord;

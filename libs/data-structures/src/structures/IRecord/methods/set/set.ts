import { AnyKey } from '../../../../types';
import type IRecord from '../../IRecord';

type SetTransform<K extends AnyKey, V> = <R extends IRecord>(
	record: R
) => R extends IRecord<K, V>
	? R
	: R extends IRecord<K>
	? IRecord.OverrideProperty<R, K, V>
	: IRecord.AddProperty<R, K, V>;

function set<K extends AnyKey, V>(key: K, value: V): SetTransform<K, V> {
	return ((record) => {
		if (record[key] === value) {
			return record;
		}

		return {
			...record,
			[key]: value
		};
	}) as SetTransform<K, V>;
}

export default set;

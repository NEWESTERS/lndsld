import { AnyKey } from '../../../../types';
import IRecord from '../../IRecord';
import hasKey from '../hasKey/hasKey';

type RemoveKeyTransform<K extends AnyKey> = <R extends IRecord>(
	record: R
) => R extends IRecord<K> ? Omit<R, K> : R;

function removeKey<K extends AnyKey>(key: K): RemoveKeyTransform<K> {
	const hasCurrentKey = hasKey(key);

	return ((record) => {
		if (!hasCurrentKey(record)) {
			return record;
		}

		const newRecord = { ...record };

		delete newRecord[key];

		return newRecord;
	}) as RemoveKeyTransform<K>;
}

export default removeKey;

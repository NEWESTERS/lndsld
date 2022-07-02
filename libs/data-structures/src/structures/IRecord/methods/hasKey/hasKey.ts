import { AnyKey } from '../../../../types';
import type IRecord from '../../IRecord';

type HasKeyPredicate<K extends AnyKey> = <R>(
	record: object
) => record is R extends IRecord ? R & IRecord<K> : IRecord<K>;

function hasKey<K extends AnyKey>(key: K): HasKeyPredicate<K> {
	return ((record) => key in record) as HasKeyPredicate<K>;
}

export default hasKey;

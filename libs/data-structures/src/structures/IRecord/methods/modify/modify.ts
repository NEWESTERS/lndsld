import { Transform } from '@lndsld/fp';

import { AnyKey } from '../../../../types';
import type IRecord from '../../IRecord';
import set from '../set/set';

type ModifyTransform<K extends AnyKey, V1, V2 = V1> = <R extends IRecord<K, V1>>(
	record: R
) => V2 extends V1 ? R : IRecord.OverrideProperty<R, K, V2>;

function modify<K extends AnyKey, V1, V2 = V1>(
	key: K,
	callback: Transform<V1, V2>
): ModifyTransform<K, V1, V2> {
	return ((record) => set(key, callback(record[key]))(record)) as ModifyTransform<K, V1, V2>;
}

export default modify;

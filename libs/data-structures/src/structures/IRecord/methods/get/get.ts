import { AnyKey } from '../../../../types';
import type IRecord from '../../IRecord';

function get<K extends AnyKey>(key: K): <R extends IRecord<K>>(record: R) => R[K] {
	return (record) => record[key];
}

export default get;

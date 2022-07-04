import { AnyKey } from '../../../../types';
import type IRecord from '../../IRecord';

function get<K extends AnyKey>(
	key: K
): <R extends IRecord>(record: R) => R extends IRecord<K> ? R[K] : unknown {
	// @ts-ignore
	return (record) => record[key];
}

export default get;

import { AnyKey } from '../../../../types';
import type IRecord from '../../IRecord';

function getKeys<T extends AnyKey>(record: IRecord<T>): T[] {
	return Object.keys(record) as T[];
}

export default getKeys;

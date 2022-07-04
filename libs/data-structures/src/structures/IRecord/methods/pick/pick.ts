import { AnyKey } from '../../../../types';
import type IRecord from '../../IRecord';

type PickTransform<T extends AnyKey> = <R extends IRecord<T>>(record: R) => Pick<R, T>;

function pick<T extends AnyKey>(keys: T[]): PickTransform<T> {
	return ((record) => Object.fromEntries(keys.map((key) => [key, record[key]]))) as PickTransform<T>;
}

export default pick;

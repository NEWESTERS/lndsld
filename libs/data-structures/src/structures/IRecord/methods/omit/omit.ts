import { AnyKey } from '../../../../types';
import type IRecord from '../../IRecord';
import getKeys from '../getKeys/getKeys';
import pick from '../pick/pick';

type OmitTransform<T extends AnyKey> = <R extends IRecord>(record: R) => Omit<R, T>;

function omit<T extends AnyKey>(keys: T[]): OmitTransform<T> {
	return ((record) =>
		pick(getKeys(record).filter((key) => keys.includes(key)))(record)) as OmitTransform<T>;
}

export default omit;

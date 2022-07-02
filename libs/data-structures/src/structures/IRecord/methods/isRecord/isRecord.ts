import type IRecord from '../../IRecord';

function isRecord(value: unknown): value is IRecord {
	return typeof value === 'object' && value !== null;
}

export default isRecord;

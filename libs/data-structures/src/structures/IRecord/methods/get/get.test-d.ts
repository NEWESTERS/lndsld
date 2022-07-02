import { expectType, expectError } from 'tsd';

import IRecord from '../../IRecord';

interface SourceType {
	foo: number;
}

const rec: SourceType = { foo: 1 };

expectType<number>(IRecord.get('foo')(rec));

expectError(IRecord.get('bar')(rec));

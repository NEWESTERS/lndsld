import { pipe } from '@lndsld/fp';
import { expectType } from 'tsd';

import IRecord from '../../IRecord';

interface SourceType {
	foo: number;
}

const rec: SourceType = { foo: 1 };

expectType<number>(pipe(rec, IRecord.get('foo')));

expectType<unknown>(IRecord.get('bar')(rec));

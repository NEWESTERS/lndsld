import { pipe } from '@lndsld/fp';
import { expectType, expectAssignable } from 'tsd';

import IRecord from '../../IRecord';

type SourceType = {
	foo: number;
};

const rec: SourceType = { foo: 1 };

// remove existing key
const withoutKey = pipe(rec, IRecord.removeKey('foo'));
expectAssignable<{}>(withoutKey);

// remove not existing key
const withUnchangedType = pipe(rec, IRecord.removeKey('bar'));
expectType<SourceType>(withUnchangedType);

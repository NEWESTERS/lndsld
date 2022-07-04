import { pipe } from '@lndsld/fp';
import { expectAssignable, expectNotAssignable } from 'tsd';

import IRecord from '../../IRecord';

declare const record: { foo: string; bar: string; baz: string };

expectAssignable<{ foo: string; bar: string }>(pipe(record, IRecord.pick(['foo', 'bar'])));
expectNotAssignable<{ baz: string }>(pipe(record, IRecord.pick(['foo', 'bar'])));

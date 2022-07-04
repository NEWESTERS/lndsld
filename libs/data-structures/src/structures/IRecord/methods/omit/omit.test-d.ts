import { pipe } from '@lndsld/fp';
import { expectAssignable, expectNotAssignable } from 'tsd';

import IRecord from '../../IRecord';

declare const record: { foo: string; bar: string; baz: string };

expectAssignable<{ baz: string }>(pipe(record, IRecord.omit(['foo', 'bar'])));
expectNotAssignable<{ foo: string; bar: string }>(pipe(record, IRecord.omit(['foo', 'bar'])));

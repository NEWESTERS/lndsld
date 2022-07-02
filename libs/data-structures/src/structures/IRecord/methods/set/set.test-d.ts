import { pipe } from '@lndsld/fp';
import { expectType, expectAssignable, expectError } from 'tsd';

import IRecord from '../../IRecord';

type SourceType = Readonly<{
	foo: number;
}>;

const rec: SourceType = { foo: 1 };

// add new property
const withAddedProperty = pipe(rec, IRecord.set('bar', 'text'));
expectAssignable<{ foo: number; bar: string }>(withAddedProperty);

// record is read-only
expectError(() => (withAddedProperty.foo = 2));

// override property type
const withOverriddenProperty = pipe(rec, IRecord.set('foo', 'test'));
expectAssignable<{ foo: string }>(withOverriddenProperty);

// unchanged property type
const withUnchangedType = pipe(rec, IRecord.set('foo', 3));
expectType<SourceType>(withUnchangedType);

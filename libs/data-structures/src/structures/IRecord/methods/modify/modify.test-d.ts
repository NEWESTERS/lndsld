import { pipe, Transform } from '@lndsld/fp';
import { expectType, expectAssignable, expectError } from 'tsd';

import IRecord from '../../IRecord';

interface SourceType {
	foo: number;
}

const rec: SourceType = { foo: 1 };

declare const numberToNumber: Transform<number>;
declare const stringToNumber: Transform<string, number>;
declare const numberToString: Transform<number, string>;

// unchanged property type
const withUnchangedType = pipe(rec, IRecord.modify('foo', numberToNumber));
expectType<SourceType>(withUnchangedType);

// invalid modifier input
expectError(() => pipe(rec, IRecord.modify('foo', stringToNumber)));

// override property type
const withOverriddenType = pipe(rec, IRecord.modify('foo', numberToString));
expectAssignable<{ foo: string }>(withOverriddenType);

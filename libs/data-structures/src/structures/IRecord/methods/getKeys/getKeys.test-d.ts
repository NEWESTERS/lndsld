import { pipe } from '@lndsld/fp';
import { expectType, expectNotType } from 'tsd';

import IRecord from '../../IRecord';

expectType<Array<'foo' | 'bar'>>(pipe({ foo: 1, bar: false }, IRecord.getKeys));

expectNotType<string[]>(IRecord.getKeys({ foo: 1, bar: false }));

enum Test {
	Foo = 'foo',
	Bar = 'bar'
}

expectType<Array<'Foo' | 'Bar'>>(IRecord.getKeys(Test));

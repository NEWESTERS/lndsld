import { expectType, expectNotType } from 'tsd';

import IRecord from '../../IRecord';

expectType<Array<'foo' | 'bar'>>(IRecord.getKeys({ foo: 1, bar: false }));

expectNotType<string[]>(IRecord.getKeys({ foo: 1, bar: false }));

enum Test {
	Foo = 'foo',
	Bar = 'bar'
}

expectType<Array<'Foo' | 'Bar'>>(IRecord.getKeys(Test));

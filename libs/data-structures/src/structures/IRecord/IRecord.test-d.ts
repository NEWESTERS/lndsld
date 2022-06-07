import {
	expectType,
	expectAssignable,
	expectError,
	expectNotType,
} from 'tsd-lite';

import IRecord from './IRecord';

// set

const rec = { foo: 1 };

const rec2 = IRecord.set('bar', 'text')(rec);

expectAssignable<{ foo: number; bar: string }>(rec2);

expectError(() => (rec2.foo = 2));

// get

expectType<number>(IRecord.get('foo')(rec));

expectError(IRecord.get('bar')(rec));

// getKeys

expectType<Array<'foo' | 'bar'>>(IRecord.getKeys({ foo: 1, bar: false }));

expectNotType<string[]>(IRecord.getKeys({ foo: 1, bar: false }));

enum Test {
	Foo = 'foo',
	Bar = 'bar',
}

expectType<Array<'Foo' | 'Bar'>>(IRecord.getKeys(Test));

// isRecord

expectType(() => {
	const a: object = {};

	if (IRecord.isRecord(a)) {
		const b: Record<string, unknown> = a;
	}
});

// hasKey

expectType(() => {
	const a: Record<string, unknown> = {};

	if (IRecord.hasKey('foo')(a)) {
		a.foo;
	}
});

expectType(() => {
	const a = { foo: 'bar' };

	if (IRecord.hasKey('bar')(a)) {
		a.bar;
	}
});

expectType(() => {
	const a: object = {};

	if (
		IRecord.isRecord(a) &&
		IRecord.hasKey('foo')(a) &&
		typeof a.foo === 'string' &&
		IRecord.hasKey('bar')(a) &&
		typeof a.bar === 'string' &&
		IRecord.hasKey('baz')(a)
	) {
		a.foo;
		a.bar;
		a.baz;
	}
});

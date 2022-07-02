import { expectType, expectAssignable, expectError, expectNotType } from 'tsd';

import IRecord from './IRecord';

interface SourceType {
	foo: number;
}

const rec: SourceType = { foo: 1 };

// set
{
	const rec2 = IRecord.set('bar', 'text')(rec);

	// record is read-only
	expectError(() => (rec2.foo = 2));

	// add new property
	expectAssignable<{ foo: number; bar: string }>(rec2);

	// override property type
	expectAssignable<{ foo: string }>(IRecord.set('foo', 'test')(rec));

	// unchanged property type
	expectType<SourceType>(IRecord.set('foo', 3)(rec));
}

// get
{
	expectType<number>(IRecord.get('foo')(rec));

	expectError(IRecord.get('bar')(rec));
}

// getKeys
{
	expectType<Array<'foo' | 'bar'>>(IRecord.getKeys({ foo: 1, bar: false }));

	expectNotType<string[]>(IRecord.getKeys({ foo: 1, bar: false }));

	enum Test {
		Foo = 'foo',
		Bar = 'bar'
	}

	expectType<Array<'Foo' | 'Bar'>>(IRecord.getKeys(Test));
}

// isRecord
{
	expectType(() => {
		const a: object = {};

		if (IRecord.isRecord(a)) {
			const b: Record<string, unknown> = a;
		}
	});
}

// hasKey
{
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
}

// modify
{
	// unchanged property type
	expectType<SourceType>(IRecord.modify('foo', (num: number) => num + 1)(rec));

	expectError(() => IRecord.modify('foo', (str: string) => str)(rec));

	// override property type
	expectAssignable<{ foo: string }>(IRecord.modify('foo', (num: number) => num.toString())(rec));
}

// removeKey
{
	// remove existing key
	expectAssignable<{}>(IRecord.removeKey('foo')(rec));

	// remove not existing key
	expectType<SourceType>(IRecord.removeKey('bar')(rec));
}

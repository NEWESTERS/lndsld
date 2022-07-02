import { expectType } from 'tsd';

import IRecord from '../../IRecord';

expectType(() => {
	const a: IRecord<string> = {};

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
	const a: unknown = {};

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

interface Foo {
	type: 'foo';
	foo: string;
}

interface Bar {
	type: 'bar';
	bar: string;
}

type FooOrBar = Foo | Bar;

declare const fooOrBar: FooOrBar;

if (IRecord.hasKey('foo')(fooOrBar)) {
	expectType<Foo>(fooOrBar);
} else {
	expectType<Bar>(fooOrBar);
}

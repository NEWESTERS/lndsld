import { expectType, expectError } from 'tsd';

import IDictionary from './IDictionary';

// create

const dictionary = IDictionary.create<'foo' | 'bar'>();

expectType<IDictionary<'foo' | 'bar'>>(dictionary);

// set

expectType<IDictionary<'foo' | 'bar'>>(IDictionary.set('foo', 'foo' as const)(dictionary));

expectType<IDictionary<string>>(IDictionary.set('foo', 'text')(dictionary));

expectType<IDictionary<number | 'foo' | 'bar'>>(IDictionary.set('foo', 1)(dictionary));

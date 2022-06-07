import { Predicate, doNothing, pipe } from '@lndsld/fp';

import IDictionary from './IDictionary';

const x2 = (value: number): number => value * 2;
const isOdd: Predicate<number> = (value) => value % 2 === 1;
const getTrue: Predicate<unknown> = () => true;

describe('IDictionary', () => {
	describe('set', () => {
		it('adds item to dictionary', () => {
			let dictionary = pipe(
				IDictionary.create<string>(),
				IDictionary.set('foo', 'bar')
			);

			expect(dictionary).toEqual({ foo: 'bar' });

			dictionary = pipe(dictionary, IDictionary.set('bar', 'baz'));

			expect(dictionary).toEqual({ foo: 'bar', bar: 'baz' });
		});

		it('returns original dictionary if unchanged', () => {
			const dict1 = pipe(
				IDictionary.create<string>(),
				IDictionary.set('foo', 'bar')
			);

			const dict2 = IDictionary.set('foo', 'bar')(dict1);

			expect(dict2).toBe(dict1);
		});
	});

	describe('removeKey', () => {
		it('removes item with specified key from dictionary', () => {
			const dictionary = pipe(
				IDictionary.create<string>(),
				IDictionary.set('foo', 'bar'),
				IDictionary.set('bar', 'baz'),
				IDictionary.removeKey('foo')
			);

			expect(dictionary).toEqual({ bar: 'baz' });
		});

		it('returns original dictionary if key does not exist', () => {
			const dict1 = pipe(
				IDictionary.create<string>(),
				IDictionary.set('foo', 'bar')
			);

			const dict2 = IDictionary.removeKey('bar')(dict1);

			expect(dict2).toBe(dict1);
		});
	});

	describe('modify', () => {
		it('modifies item with specified key', () => {
			const tree = pipe(
				IDictionary.create<number>(),
				IDictionary.set('test', 2),
				IDictionary.modify('test', x2)
			);

			expect(tree.test).toEqual(4);
		});

		it('returns original dictionary if unchanged', () => {
			const dict1 = pipe(
				IDictionary.create<string>(),
				IDictionary.set('foo', 'bar')
			);

			const dict2 = IDictionary.modify('foo', doNothing)(dict1);

			expect(dict2).toBe(dict1);
		});
	});

	describe('filter', () => {
		it('returns new dictionary with items that pass predicate', () => {
			const dict = pipe(
				IDictionary.create<number>(),
				IDictionary.set('foo', 1),
				IDictionary.set('bar', 2),
				IDictionary.set('baz', 3)
			);

			const oddDict = IDictionary.filter(isOdd)(dict);

			expect(oddDict).toEqual({
				foo: 1,
				baz: 3,
			});
		});

		it('returns original dictionary if all items pass predicate', () => {
			const dict = pipe(
				IDictionary.create<number>(),
				IDictionary.set('foo', 1),
				IDictionary.set('bar', 2),
				IDictionary.set('baz', 3)
			);

			const filteredDict = IDictionary.filter(getTrue)(dict);

			expect(filteredDict).toBe(dict);
		});
	});

	describe('getMany', () => {
		it('returns items for all specifiedKeys', () => {
			const dict = pipe(
				IDictionary.create<number>(),
				IDictionary.set('foo', 1),
				IDictionary.set('bar', 2),
				IDictionary.set('baz', 3)
			);

			const list = IDictionary.getMany(['foo', 'baz'])(dict);

			expect(list).toEqual([1, 3]);
		});
	});
});

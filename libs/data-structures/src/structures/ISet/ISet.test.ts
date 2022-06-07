import { Predicate, pipe } from '@lndsld/fp';

import { IList } from '../IList';
import ISet from './ISet';

describe('ISet', () => {
	describe('add', () => {
		it('add item to set', () => {
			const set = pipe(ISet.create<number>(), ISet.add(1));

			expect(set).toEqual({ 1: 1 });
		});

		it('returns original set if unchanged', () => {
			const set1 = pipe(ISet.create<string>(), ISet.add('foo'));

			const set2 = ISet.add('foo')(set1);

			expect(set2).toBe(set1);
		});
	});

	describe('remove', () => {
		it('removes item from set', () => {
			const set = pipe(
				ISet.create<number>(),
				ISet.add(1),
				ISet.add(2),
				ISet.remove(2)
			);

			expect(set).toEqual({ 1: 1 });
		});

		it('returns original set if key not exist', () => {
			const set1 = pipe(ISet.create<string>(), ISet.add('foo'));

			const set2 = ISet.remove('bar')(set1);

			expect(set2).toBe(set1);
		});
	});

	describe('has', () => {
		it('finds primitive in set', () => {
			const set = pipe(ISet.create<number>(), ISet.add(1));

			expect(ISet.has(1)(set)).toBe(true);
		});

		it('finds non primitive in set', () => {
			const set = pipe(
				ISet.create<{ foo: string }>(),
				ISet.add({ foo: 'bar' })
			);

			expect(ISet.has({ foo: 'bar' })(set)).toBe(true);
		});
	});

	describe('fromList', () => {
		it('creates set from list', () => {
			const set = pipe(
				IList.create<number>(),
				IList.push(1),
				IList.push(2),
				IList.push(2),
				ISet.fromList
			);

			expect(set).toEqual({ 1: 1, 2: 2 });
		});
	});

	describe('toList', () => {
		it('creates list from set', () => {
			const list = pipe(
				ISet.create<number>(),
				ISet.add(1),
				ISet.add(2),
				ISet.toList
			);

			expect(list).toEqual([1, 2]);
		});
	});

	describe('getLength', () => {
		it('returns set length', () => {
			let set = ISet.create<number>();

			expect(ISet.getLength(set)).toBe(0);

			set = pipe(set, ISet.add(1), ISet.add(2));

			expect(ISet.getLength(set)).toBe(2);
		});
	});

	describe('isEmpty', () => {
		it('returns set emptiness', () => {
			let set = ISet.create<number>();

			expect(ISet.isEmpty(set)).toBe(true);

			set = pipe(set, ISet.add(1), ISet.add(2));

			expect(ISet.isEmpty(set)).toBe(false);
		});
	});

	describe('concat', () => {
		it('merges two sets', () => {
			const FOO = 'foo';
			const BAR = 'bar';

			const setFoo = pipe(ISet.create<string>(), ISet.add(FOO));
			const setBar = pipe(ISet.create<string>(), ISet.add(BAR));

			const setFooBar = pipe(setFoo, ISet.concat(setBar));

			expect(ISet.has(FOO)(setFooBar)).toBe(true);
			expect(ISet.has(BAR)(setFooBar)).toBe(true);
		});
	});

	describe('exclude', () => {
		it('removes items from set', () => {
			const FOO = 'foo';
			const BAR = 'bar';

			const exclusion = pipe(ISet.create<string>(), ISet.add(FOO));
			const set = pipe(
				ISet.create<string>(),
				ISet.add(FOO),
				ISet.add(BAR)
			);

			const result = pipe(set, ISet.exclude(exclusion));

			expect(ISet.has(FOO)(result)).toBe(false);
			expect(ISet.has(BAR)(result)).toBe(true);
		});
	});

	describe('map', () => {
		it('creates new set with items precessed with callback', () => {
			const set = pipe(
				ISet.create<string>(),
				ISet.add('foo'),
				ISet.add('bar')
			);

			const result = pipe(
				set,
				ISet.map((item) => item.toUpperCase())
			);

			const expectedResult = pipe(
				ISet.create<string>(),
				ISet.add('FOO'),
				ISet.add('BAR')
			);

			expect(result).toEqual(expectedResult);
		});
	});

	describe('find', () => {
		// eslint-disable-next-line unicorn/consistent-function-scoping
		const predicate: Predicate<{ id: string }> = ({ id }) => id === 'foo';

		it('returns item that passes predicate', () => {
			const set = ISet.fromList([
				{ id: 'bar' },
				{ id: 'foo' },
				{ id: 'baz' },
			]);

			expect(ISet.find(predicate)(set)).toEqual({ id: 'foo' });
		});

		it('returns undefined if no item passes predicate', () => {
			const set = ISet.fromList([{ id: 'bar' }, { id: 'baz' }]);

			expect(ISet.find(predicate)(set)).toEqual(undefined);
		});
	});

	describe('create', () => {
		it('creates set with passed arguments included', () => {
			const set = ISet.create('foo', 'bar');

			expect(ISet.has('foo')(set)).toBe(true);
			expect(ISet.has('bar')(set)).toBe(true);
		});
	});
});

import { Predicate, pipe } from '@lndsld/fp';

import IStack from './IStack';

const isOdd: Predicate<number> = (value) => value % 2 === 1;
const isEven: Predicate<number> = (value) => !isOdd(value);

describe('IStack', () => {
	describe('push', () => {
		it('adds item to end of stack', () => {
			const stack = pipe(
				IStack.create<number>(),
				IStack.push(1),
				IStack.push(2)
			);

			expect(stack).toEqual([1, 2]);
		});
	});

	describe('pop', () => {
		it('removes items from end of stack', () => {
			const stack = pipe(
				IStack.create<number>(),
				IStack.push(1),
				IStack.push(2),
				IStack.pop
			);

			expect(stack).toEqual([1]);
		});
	});

	describe('find', () => {
		const stack = pipe(IStack.create<number>(), IStack.push(1));

		it('finds existing value in stack', () => {
			expect(IStack.find(isOdd)(stack)).toBe(1);
		});

		it('not finds not existing value in stack', () => {
			expect(IStack.find(isEven)(stack)).toBeUndefined();
		});
	});

	describe('has', () => {
		const stack = pipe(IStack.create<number>(), IStack.push(1));

		it('finds existing value in stack', () => {
			expect(IStack.has(1)(stack)).toBe(true);
		});

		it('not finds not existing value in stack', () => {
			expect(IStack.has(2)(stack)).toBe(false);
		});
	});

	describe('map', () => {
		const numberStack = pipe(
			IStack.create<number>(),
			IStack.push(1),
			IStack.push(2),
			IStack.push(3)
		);

		const stringStack = pipe(
			numberStack,
			IStack.map((number) => number.toString())
		);

		expect(stringStack).toEqual(['1', '2', '3']);
	});
});

import pipe from './pipe';

const add1 = (a: number): number => a + 1;

describe('pipe', () => {
	it('works with 1 func', () => {
		const result = pipe(0, add1);

		expect(result).toBe(1);
	});

	it('works with 2 funcs', () => {
		const result = pipe(0, add1, add1);

		expect(result).toBe(2);
	});

	it('works with 3 funcs', () => {
		const result = pipe(0, add1, add1, add1);

		expect(result).toBe(3);
	});

	it('works with 4 funcs', () => {
		const result = pipe(0, add1, add1, add1, add1);

		expect(result).toBe(4);
	});

	it('works with 5 funcs', () => {
		const result = pipe(0, add1, add1, add1, add1, add1);

		expect(result).toBe(5);
	});
});

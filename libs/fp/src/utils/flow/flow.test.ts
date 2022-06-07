import flow from './flow';

const add1 = (a: number): number => a + 1;

const sum = (a: number, b: number) => a + b;

describe('flow', () => {
	it('works with 1 func', () => {
		const sumFlow = flow(sum);

		expect(sumFlow(1, 2)).toBe(3);
	});

	it('works with 2 funcs', () => {
		const addFlow = flow(sum, add1);

		expect(addFlow(1, 2)).toBe(4);
	});

	it('works with 3 funcs', () => {
		const addFlow = flow(sum, add1, add1);

		expect(addFlow(1, 2)).toBe(5);
	});

	it('works with 4 funcs', () => {
		const addFlow = flow(sum, add1, add1, add1);

		expect(addFlow(1, 2)).toBe(6);
	});

	it('works with 5 funcs', () => {
		const addFlow = flow(sum, add1, add1, add1, add1);

		expect(addFlow(1, 2)).toBe(7);
	});
});

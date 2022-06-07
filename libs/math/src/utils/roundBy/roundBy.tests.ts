import roundBy from './roundBy';

describe('roundBy', () => {
	const roundBy4 = roundBy(4);

	it('returns number with fixed digits after dot', () => {
		expect(roundBy4(Math.PI)).toBe(3.1415);
	});
});

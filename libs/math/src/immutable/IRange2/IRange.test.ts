import IRange2 from './IRange2';

describe('IRange', () => {
	describe('create', () => {
		it('creates valid range', () => {
			expect(IRange2.create(1, 2)).toEqual([1, 2]);
			expect(IRange2.create(2, 1)).toEqual([1, 2]);
		});
	});

	describe('createLocality', () => {
		it('creates locality with specified radius', () => {
			expect(IRange2.createLocality(0, 1)).toEqual([-1, 1]);
			expect(IRange2.createLocality(1, 2)).toEqual([-1, 3]);
		});
	});

	describe('contains', () => {
		it('returns true for contained value', () => {
			const range = IRange2.create(-3, 3);

			expect(IRange2.contains(1, range)).toBe(true);
			expect(IRange2.contains(-3, range)).toBe(true);
			expect(IRange2.contains(3, range)).toBe(true);
		});

		it('returns false for not contained value', () => {
			const range = IRange2.create(-3, 3);

			expect(IRange2.contains(-4, range)).toBe(false);
			expect(IRange2.contains(5, range)).toBe(false);
		});
	});

	describe('getLength', () => {
		it('returns range length', () => {
			const range1 = IRange2.create(-2, 5);

			expect(IRange2.getLength(range1)).toBe(7);

			const range2 = IRange2.create(-7, -2);
			expect(IRange2.getLength(range2)).toBe(5);
		});
	});
});

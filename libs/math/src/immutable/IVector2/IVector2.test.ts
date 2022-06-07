import IVector2 from './IVector2';

describe('IVector2', () => {
	describe('create', () => {
		it('creates vector by coordinates', () => {
			const vector = IVector2.create(1, 2);

			expect(vector).toEqual({ x: 1, y: 2 });
		});

		it('creates vector by points', () => {
			const pointFrom = IVector2.create(1, 2);
			const pointTo = IVector2.create(3, 3);
			const vector = IVector2.create(pointFrom, pointTo);

			expect(vector).toEqual({ x: 2, y: 1 });
		});
	});

	describe('compare', () => {
		it('returns true for equal vectors', () => {
			const vector1 = IVector2.create(1, 2);
			const vector2 = IVector2.create(1, 2);

			expect(IVector2.compare(vector1, vector2)).toBe(true);
		});

		it('returns false for not equal vectors', () => {
			const vector1 = IVector2.create(1, 2);
			const vector2 = IVector2.create(3, 3);

			expect(IVector2.compare(vector1, vector2)).toBe(false);
		});
	});

	describe('getReversed', () => {
		it('returns vector with reversed direction', () => {
			const vector = IVector2.create(1, 2);

			const reversedVector = IVector2.getReversed(vector);

			expect(reversedVector).toEqual({ x: -1, y: -2 });

			expect(IVector2.add(vector)(reversedVector)).toEqual(
				IVector2.create(0, 0)
			);

			expect(IVector2.getReversed(IVector2.Up)).toEqual(IVector2.Down);
		});
	});

	describe('getNormalized', () => {
		it('returns vector normal', () => {
			const vector = IVector2.create(3, 4);

			expect(IVector2.getNormalized(vector)).toEqual({
				x: 3 / 5,
				y: 4 / 5,
			});
		});
	});

	describe('compareDirection', () => {
		it('returns true for vectors with same direction', () => {
			const vector1 = IVector2.create(1, 2);
			const vector2 = IVector2.create(2, 4);

			expect(IVector2.compareDirection(vector1, vector2)).toBe(true);

			expect(
				IVector2.compareDirection(
					IVector2.Left,
					IVector2.getReversed(IVector2.Right)
				)
			).toBe(true);
		});

		it('returns false for vectors with different direction', () => {
			const vector1 = IVector2.create(1, 2);
			const vector2 = IVector2.create(2, 5);

			expect(IVector2.compareDirection(vector1, vector2)).toBe(false);

			expect(IVector2.compareDirection(IVector2.Left, IVector2.Up)).toBe(
				false
			);
		});
	});
});

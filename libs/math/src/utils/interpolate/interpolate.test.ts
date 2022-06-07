import interpolate from './interpolate';

describe('interpolate', () => {
	it('should linear interpolate value from range to target range', () => {
		const interpolateFunction = interpolate([0, 1], [-5, 5]);

		expect(interpolateFunction(0)).toBe(-5);
		expect(interpolateFunction(0.5)).toBe(0);
		expect(interpolateFunction(1)).toBe(5);
	});

	it('should interpolate value out of range to out of target range', () => {
		const interpolateFunction1 = interpolate([-1, 1], [-3, 3]);

		expect(interpolateFunction1(-2)).toBe(-6);

		const interpolateFunction2 = interpolate([0, 1], [0, 2]);

		expect(interpolateFunction2(2)).toBe(4);
		expect(interpolateFunction2(-1)).toBe(-2);
	});

	it('should handle zero length value range', () => {
		const interpolateFunction = interpolate([0, 0], [3, 10]);

		expect(interpolateFunction(1)).toBeNaN();
	});

	it('should handle zero length target range', () => {
		const interpolateFunction = interpolate([-1, 1], [0, 0]);

		expect(interpolateFunction(0.5)).toBe(0);
		expect(interpolateFunction(2)).toBe(Number.POSITIVE_INFINITY);
		expect(interpolateFunction(-2)).toBe(Number.NEGATIVE_INFINITY);
	});
});

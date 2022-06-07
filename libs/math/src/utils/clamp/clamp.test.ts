import { IRange2 } from '../../immutable';
import clamp from './clamp';

describe('clamp', () => {
	const MIN = -10;
	const MAX = 30;

	const testMinMaxClamp = clamp(MIN, MAX);
	const testRangeClamp = clamp(IRange2.create(MIN, MAX));

	it('returns min if value is less then min', () => {
		expect(testMinMaxClamp(-11)).toBe(MIN);
		expect(testRangeClamp(-11)).toBe(MIN);
	});

	it('returns max if value is greater then max', () => {
		expect(testMinMaxClamp(40)).toBe(MAX);
		expect(testRangeClamp(40)).toBe(MAX);
	});

	it('returns value if value is between min and max', () => {
		expect(testMinMaxClamp(20)).toBe(20);
		expect(testRangeClamp(20)).toBe(20);
	});
});

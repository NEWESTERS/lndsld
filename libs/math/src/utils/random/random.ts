import { IRange2 } from '../../immutable';
import { interpolate } from '../interpolate';

const MATH_RANDOM_RANGE: IRange2 = IRange2.create(0, 1);

/**
 * Returns random value from specified range
 * @public
 */
function random(range: IRange2): number;
function random(min: number, max: number): number;
function random(...parameters: [IRange2] | [number, number]): number {
	const range = IRange2.isRange(parameters[0])
		? parameters[0]
		: IRange2.create(parameters[0], parameters[1]!);

	return interpolate(MATH_RANDOM_RANGE, range)(Math.random());
}

export default random;

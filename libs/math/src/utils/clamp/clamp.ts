import { Transform } from '@lndsld/fp';

import { IRange2 } from '../../immutable';

/**
 * Clamp value in range
 * @param range - target range
 * @public
 */
function clamp(range: IRange2): Transform<number>;
/**
 * Clamp value in range
 * @param min - start of target range
 * @param max - end of target range
 * @public
 */
function clamp(min: number, max: number): Transform<number>;
function clamp(...parameters: [IRange2] | [number, number]): Transform<number> {
	let min: number;
	let max: number;

	if (IRange2.isRange(parameters[0])) {
		min = parameters[0][0];
		max = parameters[0][1];
	} else {
		min = parameters[0];
		max = parameters[1]!;
	}

	return (value) => {
		if (value < min) return min;

		if (value > max) return max;

		return value;
	};
}

export default clamp;

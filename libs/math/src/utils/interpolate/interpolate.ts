import { Transform } from '@lndsld/fp';

import { IRange2 } from '../../immutable';

/**
 * Interpolates value from one range to another
 * @public
 */
function interpolate(
	valueRange: IRange2,
	targetRange: IRange2
): Transform<number> {
	const valueRangeLength = IRange2.getLength(valueRange);
	const targetRangeLength = IRange2.getLength(targetRange);

	if (valueRangeLength === 0) {
		return () => Number.NaN;
	}

	if (targetRangeLength === 0) {
		return (value) => {
			if (IRange2.contains(value, valueRange)) {
				return 0;
			}

			return value < 0
				? Number.NEGATIVE_INFINITY
				: Number.POSITIVE_INFINITY;
		};
	}

	const multiplier = targetRangeLength / valueRangeLength;

	return (value) => targetRange[0] + (value - valueRange[0]) * multiplier;
}

export default interpolate;

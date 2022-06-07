import { Transform } from '@lndsld/fp';

import { IRange2 } from '../../immutable';

/**
 * @public
 */
function moveToTarget(
	targetValue: number
): (speed: number) => Transform<number> {
	return (speed) => {
		const targetLocality = IRange2.createLocality(targetValue, speed);

		return (value) => {
			if (IRange2.contains(value, targetLocality)) {
				return targetValue;
			} else {
				return value > targetValue ? value - speed : value + speed;
			}
		};
	};
}

export default moveToTarget;

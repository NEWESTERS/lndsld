import { Transform } from '@lndsld/fp';

/**
 * Round float number with specified accuracy
 * @param digits - fraction digits
 */
function roundBy(digits: number): Transform<number> {
	return (value) => Number(value.toFixed(digits));
}

export default roundBy;

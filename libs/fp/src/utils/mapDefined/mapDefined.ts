import { Transform } from '../../types';

/**
 * Apply transformation to value if it's defined
 * @param transform - transformation for defined value
 * @returns transformation for optional value
 * @public
 */
function mapDefined<T1, T2>(transform: Transform<T1, T2>): Transform<T1 | undefined, T2 | undefined> {
	return (value) => (value === undefined ? undefined : transform(value));
}

export default mapDefined;

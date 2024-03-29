import { useEffect, useRef } from 'react';

/**
 * Get value from previous render
 * @param value - current value
 * @returns value from previous render
 * @public
 */
function usePrevious<T>(value: T): T | undefined;
/**
 * Get value from previous render
 * @param value - current value
 * @param initialValue - previous value for first render
 * @returns value from previous render
 * @public
 */
function usePrevious<T, I>(value: T, initialValue: I): T | I;
function usePrevious<T, I>(value: T, initialValue?: I): T | I | undefined {
	const previousRef = useRef<T | I | undefined>(initialValue);

	useEffect(() => {
		previousRef.current = value;
	});

	return previousRef.current;
}

export default usePrevious;

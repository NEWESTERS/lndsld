import { useEffect, useRef } from 'react';

/**
 * Get value from previous render
 * @param value - current value
 * @returns value from previous render
 * @public
 */
function usePrevious<T>(value: T): T | undefined {
	const previousRef = useRef<T>();

	useEffect(() => {
		previousRef.current = value;
	});

	return previousRef.current;
}

export default usePrevious;

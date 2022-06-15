import { useCallback, useEffect, useRef } from 'react';

import { EventCallback } from './types';
import useEvent from './useEvent';

/**
 * Apply debounce to callback
 *
 * If callback wasn't invoked during specified time, last call will be invoked
 * @param callback - callback to debounce
 * @param delay - debounce time (if zero or undefined, debounce will not be applied)
 * @returns debounced callback
 * @public
 */
function useDebouncedCallback<P extends unknown[]>(
	callback: EventCallback<P>,
	delay?: number
): EventCallback<P> {
	const onDebounce = useEvent(callback);
	const timerRef = useRef<number>();

	useEffect(
		() => () => {
			window.clearTimeout(timerRef.current);
		},
		[]
	);

	return useCallback(
		(...parameters) => {
			window.clearTimeout(timerRef.current);

			if (delay) {
				timerRef.current = window.setTimeout(() => {
					onDebounce(...parameters);
				}, delay);
			} else {
				onDebounce(...parameters);
			}
		},
		[delay, onDebounce]
	);
}

export default useDebouncedCallback;

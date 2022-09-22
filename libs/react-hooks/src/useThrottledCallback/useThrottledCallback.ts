import { useCallback, useEffect, useRef } from 'react';

import { useEvent } from '../useEvent';
import { EventCallback } from '../types';

/**
 * Throttle callback
 *
 * Reduce frequency of callback invocations
 * @param callback - callback to throttle
 * @param timeout - min time between callback invocations
 * @returns throttled callback
 * @public
 */
function useThrottledCallback<P extends unknown[]>(
	callback: EventCallback<P>,
	timeout: number
): EventCallback<P> {
	const onThrottle = useEvent(callback);
	const timerRef = useRef<number>();

	useEffect(
		() => () => {
			window.clearTimeout(timerRef.current);
		},
		[]
	);

	return useCallback(
		(...parameters) => {
			if (timerRef.current === undefined) {
				onThrottle(...parameters);

				timerRef.current = window.setTimeout(() => {
					timerRef.current = undefined;
				}, timeout);
			}
		},
		[timeout, onThrottle]
	);
}

export default useThrottledCallback;

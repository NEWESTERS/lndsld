import { useCallback, useEffect, useRef } from 'react';

import { useEvent } from '../useEvent';
import { EventCallback } from '../types';

/**
 * Declaration of API to control interval
 * @public
 */
export interface IntervalAPI {
	/**
	 * Start interval (restart if already started)
	 * @param time - delay between calls
	 * @returns function to stop interval
	 */
	start: (delay: number) => () => void;
	/** Stop interval */
	stop: () => void;
}

/**
 * Let callback automatically run with specified time interval
 * @param callback - callback to run
 * @param initialDelay - delay to start interval on hook mount
 * @returns interval API
 * @public
 */
function useInterval(callback: EventCallback<[]>, initialDelay?: number): IntervalAPI {
	const timerRef = useRef<number>();
	const onTick = useEvent(callback);

	const stop = useCallback(() => {
		window.clearInterval(timerRef.current);
		timerRef.current = undefined;
	}, []);

	const start = useCallback(
		(time: number) => {
			stop();
			timerRef.current = window.setInterval(onTick, time);

			return stop;
		},
		[stop, onTick]
	);

	useEffect(() => () => stop(), [stop]);

	useEffect(() => {
		if (initialDelay) {
			start(initialDelay);
		}
	}, [initialDelay, start]);

	return {
		start,
		stop
	};
}

export default useInterval;

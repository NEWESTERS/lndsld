import { useCallback, useEffect, useRef } from 'react';

import { EventCallback } from './types';

/**
 * Get stable reference to event handler
 * @param callback - event handler
 * @returns event handler with stable ref
 * @see {@link https://github.com/reactjs/rfcs/blob/useevent/text/0000-useevent.md}
 * @public
 */
function useEvent<P extends unknown[]>(
	callback: EventCallback<P>
): EventCallback<P> {
	const callbackRef = useRef(callback);

	useEffect(() => {
		callbackRef.current = callback;
	});

	return useCallback(
		(...parameters) => callbackRef.current(...parameters),
		[]
	);
}

export default useEvent;

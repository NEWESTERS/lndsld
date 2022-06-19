import { RefObject } from 'react';

import { EventCallback } from './types';
import usePointerEvent from './usePointerEvent';

/**
 * Subscribe to clicks outside of element
 * @param callback - callback, that will be invoked on click outside
 * @param ref - ref to tracked element
 * @public
 */
const useClickOutside = <T extends HTMLElement = HTMLElement>(
	callback: EventCallback<[]>,
	ref: RefObject<T>
): void => {
	const onClick = (event: Event): void => {
		if (!ref.current?.contains(event.target as Node)) {
			callback();
		}
	};

	usePointerEvent('mousedown', onClick);
	usePointerEvent('touchstart', onClick);
};

export default useClickOutside;

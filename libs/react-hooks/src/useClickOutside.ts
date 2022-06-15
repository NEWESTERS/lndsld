import { RefObject, useEffect } from 'react';

import { EventCallback } from './types';
import useEvent from './useEvent';

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
	const onClick = useEvent((event: Event): void => {
		if (!ref.current?.contains(event.target as Node)) {
			callback();
		}
	});

	useEffect(() => {
		document.addEventListener('mousedown', onClick);
		document.addEventListener('touchstart', onClick);

		return () => {
			document.removeEventListener('mousedown', onClick);
			document.removeEventListener('touchstart', onClick);
		};
	}, [onClick]);
};

export default useClickOutside;

import { RefObject, useEffect } from 'react';

import { EventCallback } from './types';
import useEvent from './useEvent';

/**
 * Configuration options for `useScroll` hook
 * @public
 */
export interface UseScrollOptions {
	/**
	 * Use capture phase of event§
	 */
	capture?: boolean;
	/**
	 * If `true`, event listener will not be added
	 * @defaultValue `false`
	 */
	disabled?: boolean;
	/**
	 * @see {@link https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md}
	 */
	passive?: boolean;
	/**
	 * Ref to element, which events will be listened
	 * @defaultValue ref to `document`
	 */
	ref?: RefObject<HTMLElement>;
}

/**
 * Subscribe to scroll events
 * @public
 */
function useScroll(handler: EventCallback<[Event]>, options: UseScrollOptions = {}): void {
	const { capture, passive, disabled, ref } = options;

	const handleScroll = useEvent(handler);

	useEffect(() => {
		if (disabled) {
			return;
		}

		const element = ref?.current ?? document.body;

		element.addEventListener('scroll', handleScroll, { capture, passive });

		return () => {
			element.removeEventListener('scroll', handleScroll);
		};
	}, [handleScroll, capture, passive, ref, disabled]);
}

export default useScroll;

import { RefObject, useEffect, useState } from 'react';

import useEvent from './useEvent';
import { getDOMRect } from './utils';

/**
 * Configuration options for `useResize` hook
 * @public
 */
export interface UseResizeOptions {
	/** Change element's size event */
	onResize?: ResizeObserverCallback;
}

/**
 * Subscribe to element's resize
 * @public
 */
function useResize(ref: RefObject<HTMLElement>, options: UseResizeOptions = {}): DOMRect | undefined {
	const { onResize } = options;

	const [domRect, setDomRect] = useState(() => getDOMRect(ref));

	const handleResize = useEvent<Parameters<ResizeObserverCallback>>((...parameters) => {
		onResize?.(...parameters);
		setDomRect(getDOMRect(ref));
	});

	useEffect(() => {
		const element = ref.current;

		if (!element) {
			return;
		}

		const resizeObserver = new ResizeObserver(handleResize);

		resizeObserver.observe(element);

		return () => {
			resizeObserver.disconnect();
		};
	}, [ref, handleResize]);

	return domRect;
}

export default useResize;

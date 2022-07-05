import { RefObject, useState } from 'react';
import { pipe } from '@lndsld/fp';

import useResize from './useResize';
import useScroll from './useScroll';
import { getDOMRect } from './utils';

/**
 * Subscribe to changes of element's `DOMRect`
 * @public
 */
function useDomRect(ref: RefObject<HTMLElement>): DOMRect | undefined {
	const [domRect, setDomRect] = useState(() => getDOMRect(ref));

	const updateDomRect = (): void => pipe(ref, getDOMRect, setDomRect);

	useResize(ref, { onResize: updateDomRect });

	useScroll(updateDomRect, { capture: true });

	return domRect;
}

export default useDomRect;

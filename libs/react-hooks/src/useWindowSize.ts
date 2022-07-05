import { useEffect, useState } from 'react';
import { IVector2 } from '@lndsld/math';
import { flow } from '@lndsld/fp';

function getWindowSize(): IVector2 {
	return IVector2.create(window.innerWidth, window.innerHeight);
}

/**
 * Subscribe to changes of browser window's `width` and `height`
 * @public
 */
function useWindowSize(): IVector2 {
	const [windowSize, setWindowSize] = useState<IVector2>(getWindowSize);

	useEffect(() => {
		const updateSize = flow(getWindowSize, setWindowSize);

		window.addEventListener('resize', updateSize);

		return () => {
			window.removeEventListener('resize', updateSize);
		};
	}, []);

	return windowSize;
}

export default useWindowSize;

import { useLayoutEffect, useState } from 'react';

/**
 * Create root for React portal
 * @public
 */
function usePortalRoot(): HTMLDivElement {
	const [portalRoot] = useState(() => document.createElement('div'));

	useLayoutEffect(() => {
		document.body.append(portalRoot);

		return () => {
			portalRoot.remove();
		};
	}, [portalRoot]);

	return portalRoot;
}

export default usePortalRoot;

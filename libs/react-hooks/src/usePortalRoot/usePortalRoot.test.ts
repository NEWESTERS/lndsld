import { renderHook } from '@testing-library/react-hooks';

import usePortalRoot from './usePortalRoot';

describe('usePortalRoot', () => {
	it('should return same dom node on every render', () => {
		const { rerender, result } = renderHook(() => usePortalRoot());

		const firstRenderNode = result.current;

		rerender();

		expect(result.current).toBe(firstRenderNode);
	});

	it('should remove dom node on unmount', () => {
		const { result, unmount } = renderHook(() => usePortalRoot());

		expect(result.current.isConnected).toBe(true);

		unmount();

		expect(result.current.isConnected).toBe(false);
	});
});

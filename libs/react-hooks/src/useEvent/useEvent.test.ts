import { renderHook } from '@testing-library/react-hooks';

import useEvent from './useEvent';

describe('useEvent', () => {
	it('should return stable callback reference', () => {
		const { result, rerender } = renderHook(({ callback }) => useEvent(callback), {
			initialProps: { callback: () => {} }
		});

		const firstRenderCallback = result.current;

		rerender({ callback: () => {} });

		expect(result.current).toBe(firstRenderCallback);
	});
});

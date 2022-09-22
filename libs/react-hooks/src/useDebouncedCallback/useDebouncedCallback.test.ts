import { renderHook } from '@testing-library/react-hooks';

import useDebouncedCallback from './useDebouncedCallback';

describe('useDebouncedCallback', () => {
	it('should perform only last callback execution', () => {
		const callback = jest.fn();
		const delay = 100;

		const { result } = renderHook(() => useDebouncedCallback(callback, 100));

		result.current(1);
		result.current(2);
		result.current(3);

		setTimeout(() => {
			expect(callback).toBeCalledTimes(1);
			expect(callback).toBeCalledWith(3);
		}, delay);
	});
});

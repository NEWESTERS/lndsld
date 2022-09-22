import { act, renderHook } from '@testing-library/react-hooks';

import useThrottledCallback from './useThrottledCallback';

describe('useThrottledCallback', () => {
	it('should reduce callback executions', () => {
		const callback = jest.fn();
		const timeout = 80;

		const { result } = renderHook(() => useThrottledCallback(callback, timeout));

		act(() => {
			result.current();
			result.current();
			result.current();
		});

		expect(callback).toBeCalledTimes(1);

		setTimeout(() => {
			act(() => {
				result.current();
				result.current();
			});

			expect(callback).toBeCalledTimes(2);
		}, timeout);
	});
});

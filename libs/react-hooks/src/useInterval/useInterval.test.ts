import { act, renderHook } from '@testing-library/react-hooks';

import useInterval from './useInterval';

describe('useInterval', () => {
	it('should execute callback with specified interval', () => {
		const callback = jest.fn();
		const interval = 50;

		renderHook(() => useInterval(callback, interval));

		setTimeout(() => {
			expect(callback).toBeCalledTimes(1);
		}, interval);

		setTimeout(() => {
			expect(callback).toBeCalledTimes(2);
		}, interval);
	});

	it('should stop', () => {
		const callback = jest.fn();
		const interval = 50;

		const { result } = renderHook(() => useInterval(callback, interval));

		setTimeout(() => {
			expect(callback).toBeCalledTimes(1);
		}, interval);

		act(() => {
			result.current.stop();
		});

		setTimeout(() => {
			expect(callback).toBeCalledTimes(1);
		}, interval);
	});

	it('should start', () => {
		const callback = jest.fn();
		const interval = 50;

		const { result } = renderHook(() => useInterval(callback));

		setTimeout(() => {
			expect(callback).toBeCalledTimes(0);
		}, interval);

		act(() => {
			result.current.start(interval);
		});

		setTimeout(() => {
			expect(callback).toBeCalledTimes(1);
		}, interval);
	});
});

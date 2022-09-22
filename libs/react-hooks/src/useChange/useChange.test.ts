import { renderHook } from '@testing-library/react-hooks';
import useChange from './useChange';

describe('useChange', () => {
	it('should not trigger observer on mount', () => {
		const observer = jest.fn();

		renderHook(({ value }) => useChange(observer, value), {
			initialProps: { value: 0 }
		});

		expect(observer).toBeCalledTimes(0);
	});

	it('should not trigger observer if value not changed', () => {
		const observer = jest.fn();

		const { rerender } = renderHook(({ value }) => useChange(observer, value), {
			initialProps: { value: 0 }
		});

		rerender({ value: 0 });

		expect(observer).toBeCalledTimes(0);
	});

	it('should trigger observer on input change', () => {
		const observer = jest.fn();

		const { rerender } = renderHook(({ value }) => useChange(observer, value), {
			initialProps: { value: 0 }
		});

		rerender({ value: 1 });

		expect(observer).toBeCalledTimes(1);
		expect(observer).toBeCalledWith(1, 0);
	});
});

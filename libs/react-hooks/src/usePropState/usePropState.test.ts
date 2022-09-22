import { act, renderHook } from '@testing-library/react-hooks';

import usePropState from './usePropState';

describe('usePropState', () => {
	it('should sync with external value', () => {
		const { rerender, result } = renderHook(({ value }) => usePropState(value), {
			initialProps: { value: 0 }
		});

		expect(result.current[0]).toBe(0);

		rerender({ value: 1 });

		expect(result.current[0]).toBe(1);
	});

	it('should set state', () => {
		const { result } = renderHook(() => usePropState(0));

		expect(result.current[0]).toBe(0);

		act(() => {
			result.current[1](1);
		});

		expect(result.current[0]).toBe(1);
	});
});

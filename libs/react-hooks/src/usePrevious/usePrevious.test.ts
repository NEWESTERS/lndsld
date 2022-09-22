import { renderHook } from '@testing-library/react-hooks';
import usePrevious from './usePrevious';

describe('usePrevious', () => {
	it('should return previous value', () => {
		const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
			initialProps: { value: 0 }
		});

		expect(result.current).toEqual(undefined);

		rerender({ value: 1 });

		expect(result.current).toEqual(0);
	});

	it('should return custom initial value', () => {
		const { result } = renderHook(() => usePrevious(0, 'initial'));

		expect(result.current).toEqual('initial');
	});
});

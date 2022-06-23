import { useEffect } from 'react';

import useEvent from './useEvent';
import usePrevious from './usePrevious';

/**
 * Callback, invoked on value change
 * @param current - current value
 * @param previous - value from previous render
 * @public
 */
export type ChangeCallback<T> = (current: T, previous: T) => void;

const INITIAL_VALUE = Symbol('Initial value');

/**
 * Subscribe to value changes
 * (like `componentDidUpdate` from class components)
 * @param observer - callback, that should be invoked on value change
 * @param observable - value, which changes should be observed by hook
 * @public
 */
function useChange<T>(observer: ChangeCallback<T>, observable: T): void {
	const previousObservable = usePrevious(observable, INITIAL_VALUE);
	const onChange = useEvent(observer);

	useEffect(() => {
		if (previousObservable !== INITIAL_VALUE && previousObservable !== observable) {
			onChange(observable, previousObservable);
		}
	}, [previousObservable, observable, onChange]);
}

export default useChange;

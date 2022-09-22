import { useCallback } from 'react';

import { usePropState } from '../usePropState';

/**
 * Declaration of additional API for toggle
 * @public
 */
export interface ToggleAdditionalAPI {
	/** Activate toggle */
	activate: () => void;
	/** Deactivate toggle */
	deactivate: () => void;
}

/**
 * Create boolean toggle
 * @param value - value to sync
 * @returns current toggle value, function to invert it and additional API
 * @public
 */
function useToggle(value: boolean = false): [boolean, () => void, ToggleAdditionalAPI] {
	const [isActive, setIsActive] = usePropState(value);

	const activate = useCallback(() => {
		setIsActive(true);
	}, [setIsActive]);

	const deactivate = useCallback(() => {
		setIsActive(false);
	}, [setIsActive]);

	const toggle = useCallback(() => {
		setIsActive((isActive) => !isActive);
	}, [setIsActive]);

	return [
		isActive,
		toggle,
		{
			activate,
			deactivate
		}
	];
}

export default useToggle;

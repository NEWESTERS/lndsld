import { Dispatch, SetStateAction, useEffect, useState } from 'react';

/**
 * Create state from prop
 *
 * This state will by synced with prop
 * @param prop - prop value
 * @public
 */
function usePropState<T>(prop: T): [T, Dispatch<SetStateAction<T>>] {
	const [state, setState] = useState<T>(prop);

	useEffect(() => {
		setState(prop);
	}, [prop]);

	return [state, setState];
}

export default usePropState;

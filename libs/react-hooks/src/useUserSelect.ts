import { RefObject, useLayoutEffect } from 'react';

/**
 * Available values for `user-select` property
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/user-select#values}
 * @public
 */
export type UserSelectType = 'none' | 'auto' | 'text' | 'contain' | 'all';

/**
 * Configuration options for `useUserSelect` hook
 * @public
 */
export interface UseUserSelectOptions<E extends HTMLElement> {
	/**
	 * Element, which property is used
	 * @defaultValue ref to `document.body`
	 */
	ref?: RefObject<E>;
}

/**
 * Sets `user-select` CSS property
 * @param value - value for `user-select` CSS property (`boolean` shorthand also available)
 * @param options - configuration options for hook
 * @public
 */
function useUserSelect<E extends HTMLElement>(
	value: UserSelectType | boolean,
	options: UseUserSelectOptions<E> = {}
): void {
	const { ref } = options;

	useLayoutEffect(() => {
		const element = ref?.current ?? document.body;
		let userSelect: UserSelectType;

		if (typeof value === 'boolean') {
			userSelect = value ? 'auto' : 'none';
		} else {
			userSelect = value;
		}

		element.style.userSelect = userSelect;
		element.style.webkitUserSelect = userSelect;

		return () => {
			element.style.userSelect = 'auto';
			element.style.webkitUserSelect = 'auto';
		};
	}, [value, ref]);
}

export default useUserSelect;

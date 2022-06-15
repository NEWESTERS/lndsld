import { ForwardedRef, RefObject, useImperativeHandle, useRef } from 'react';

/**
 * Make proxy for `ForwardedRef`
 *
 * @example
 * ```jsx
 * import { forwardRef, useEffect } from 'react';
 *
 * const Component = forwardRef((props, forwardedRef) => {
 *  const ref = useForwardedRef(forwardedRef);
 *
 *  useEffect(() => {
 *    ref.current?.focus()
 *  }, [ref])
 *
 *  return <input type="text" ref={ref} />
 * })
 * ```
 * @public
 */
function useForwardedRef<T>(
	forwardedRef: ForwardedRef<T> | undefined
): RefObject<T> {
	const ref = useRef<T>(null);

	useImperativeHandle(forwardedRef, () => ref.current as T);

	return ref;
}

export default useForwardedRef;

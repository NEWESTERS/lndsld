import { RefObject, useLayoutEffect } from 'react';

import { useEvent } from './useEvent';
import {
	MouseEventType,
	NativeMouseEventHandler,
	TouchEventType,
	NativeTouchEventHandler,
	PointerEventType,
	NativePointerEventHandler,
	NativeEventHandler
} from './types';

/**
 * Configuration options for `usePointerEvent` hook
 * @public
 */
export interface UsePointerEventOptions<E extends HTMLElement> {
	/**
	 * Ref to element, which events will be listened
	 * @defaultValue ref to `document`
	 */
	ref?: RefObject<E>;
	/**
	 * If `true`, event listener will not be added
	 * @defaultValue `false`
	 */
	disabled?: boolean;
	/**
	 * @see {@link https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md}
	 */
	passive?: boolean;
}

/**
 * Subscribe to mouse events
 * @param eventType - type of mouse event to subscribe
 * @param handler - callback that will be invoked when mouse event dispatched
 * @param options - configuration options for hook
 * @public
 */
function usePointerEvent<E extends HTMLElement>(
	eventType: MouseEventType,
	handler: NativeMouseEventHandler,
	options?: UsePointerEventOptions<E>
): void;
/**
 * Subscribe to touch events
 * @param eventType - type of touch event to subscribe
 * @param handler - callback that will be invoked when touch event dispatched
 * @param options - configuration options for hook
 * @public
 */
function usePointerEvent<E extends HTMLElement>(
	eventType: TouchEventType,
	handler: NativeTouchEventHandler,
	options?: UsePointerEventOptions<E>
): void;
/**
 * Subscribe to pointer events
 * @param eventType - type of pointer event to subscribe
 * @param handler - callback that will be invoked when pointer event dispatched
 * @param options - configuration options for hook
 * @public
 */
function usePointerEvent<E extends HTMLElement>(
	eventType: PointerEventType,
	handler: NativePointerEventHandler,
	options?: UsePointerEventOptions<E>
): void;
function usePointerEvent<E extends HTMLElement>(
	eventType: MouseEventType | TouchEventType | PointerEventType,
	handler: NativeMouseEventHandler | NativeTouchEventHandler | NativePointerEventHandler,
	options: UsePointerEventOptions<E> = {}
): void {
	const { ref, disabled = false, passive } = options;

	const stableHandler = useEvent(handler as NativeEventHandler);

	useLayoutEffect(() => {
		if (disabled) {
			return;
		}

		const element = (ref?.current ?? document) as HTMLElement;

		element.addEventListener(eventType, stableHandler, { passive });

		return () => {
			element.removeEventListener(eventType, stableHandler);
		};
	}, [eventType, ref, disabled, passive, stableHandler]);
}

export default usePointerEvent;

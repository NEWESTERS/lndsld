/**
 * Event handler declaration
 * @public
 */
export type EventCallback<P extends unknown[]> = (...parameters: P) => void;

/**
 * Type of mouse event
 * @public
 */
export type MouseEventType = Extract<keyof HTMLElementEventMap, `mouse${string}`>;

/**
 * Native `MouseEvent` handler
 * @public
 */
export type NativeMouseEventHandler = EventCallback<[MouseEvent]>;

/**
 * Type of touch event
 * @public
 */
export type TouchEventType = Extract<keyof HTMLElementEventMap, `touch${string}`>;

/**
 * Native `TouchEvent` handler
 * @public
 */
export type NativeTouchEventHandler = EventCallback<[TouchEvent]>;

/**
 * Type of pointer event
 * @public
 */
export type PointerEventType = Extract<keyof HTMLElementEventMap, `pointer${string}`>;

/**
 * Native `PointerEvent` handler
 * @public
 */
export type NativePointerEventHandler = EventCallback<[PointerEvent]>;

/**
 * Native `Event` handler
 * @public
 */
export type NativeEventHandler = EventCallback<[Event]>;

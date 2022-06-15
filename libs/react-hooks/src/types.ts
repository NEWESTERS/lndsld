/**
 * Event handler declaration
 * @public
 */
export type EventCallback<P extends unknown[]> = (...parameters: P) => void;

import { RefObject } from 'react';

export function getDOMRect(ref: RefObject<HTMLElement>): DOMRect | undefined {
	return ref.current?.getBoundingClientRect();
}

/* eslint-disable no-unused-expressions, @typescript-eslint/ban-types */

import { flow } from '../flow';

/**
 * Performs left to right function composition and invokes it on first argument
 * @returns result of function composition invocation
 * @public
 */
function pipe<A, B>(a: A, ab: (a: A) => B): B;
/**
 * Performs left to right function composition and invokes it on first argument
 * @returns result of function composition invocation
 * @public
 */
function pipe<A, B, C>(a: A, ab: (a: A) => B, bc: (b: B) => C): C;
/**
 * Performs left to right function composition and invokes it on first argument
 * @returns result of function composition invocation
 * @public
 */
function pipe<A, B, C, D>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D): D;
/**
 * Performs left to right function composition and invokes it on first argument
 * @returns result of function composition invocation
 * @public
 */
function pipe<A, B, C, D, E>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (c: D) => E): E;
/**
 * Performs left to right function composition and invokes it on first argument
 * @returns result of function composition invocation
 * @public
 */
function pipe<A, B, C, D, E, F>(
	a: A,
	ab: (a: A) => B,
	bc: (b: B) => C,
	cd: (c: C) => D,
	de: (c: D) => E,
	// eslint-disable-next-line unicorn/prevent-abbreviations
	ef: (e: E) => F
): E;

function pipe(a: unknown, ab: Function, bc?: Function, cd?: Function, de?: Function, ef?: Function): unknown {
	// @ts-ignore
	return flow(ab, bc, cd, de, ef)(a);
}

export default pipe;

/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/ban-types */
function pipe<A, B>(a: A, ab: (a: A) => B): B;
function pipe<A, B, C>(a: A, ab: (a: A) => B, bc: (b: B) => C): C;
function pipe<A, B, C, D>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D): D;
function pipe<A, B, C, D, E>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (c: D) => E): E;
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
	let result = ab(a);

	bc && (result = bc(result));

	cd && (result = cd(result));

	de && (result = de(result));

	ef && (result = ef(result));

	return result;
}

export default pipe;

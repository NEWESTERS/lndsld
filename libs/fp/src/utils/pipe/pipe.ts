function pipe<A, B>(a: A, ab: (a: A) => B): B;
function pipe<A, B, C>(a: A, ab: (a: A) => B, bc: (b: B) => C): C;
function pipe<A, B, C, D>(
	a: A,
	ab: (a: A) => B,
	bc: (b: B) => C,
	cd: (c: C) => D
): D;
function pipe<A, B, C, D, E>(
	a: A,
	ab: (a: A) => B,
	bc: (b: B) => C,
	cd: (c: C) => D,
	de: (c: D) => E
): E;
function pipe<A, B, C, D, E, F>(
	a: A,
	ab: (a: A) => B,
	bc: (b: B) => C,
	cd: (c: C) => D,
	de: (c: D) => E,
	ef: (e: E) => F
): E;

function pipe(
	a: unknown,
	ab: Function,
	bc?: Function,
	cd?: Function,
	de?: Function,
	ef?: Function
): unknown {
	let res = ab(a);

	bc && (res = bc(res));

	cd && (res = cd(res));

	de && (res = de(res));

	ef && (res = ef(res));

	return res;
}

export default pipe;

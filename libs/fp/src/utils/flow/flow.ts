/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/ban-types */
function flow<A extends Array<unknown>, B>(ab: (...a: A) => B): (...a: A) => B;
function flow<A extends Array<unknown>, B, C>(ab: (...a: A) => B, bc: (b: B) => C): (...a: A) => C;
function flow<A extends Array<unknown>, B, C, D>(
	ab: (...a: A) => B,
	bc: (b: B) => C,
	cd: (b: C) => D
): (...a: A) => D;
function flow<A extends Array<unknown>, B, C, D, E>(
	ab: (...a: A) => B,
	bc: (b: B) => C,
	cd: (c: C) => D,
	de: (d: D) => E
): (...a: A) => E;
function flow<A extends Array<unknown>, B, C, D, E, F>(
	ab: (...a: A) => B,
	bc: (b: B) => C,
	cd: (c: C) => D,
	de: (d: D) => E,
	ef: (d: E) => F
): (...a: A) => F;

function flow(ab: Function, bc?: Function, cd?: Function, de?: Function, ef?: Function): unknown {
	return (...a: unknown[]) => {
		let result = ab(...a);

		bc && (result = bc(result));

		cd && (result = cd(result));

		de && (result = de(result));

		ef && (result = ef(result));

		return result;
	};
}

export default flow;

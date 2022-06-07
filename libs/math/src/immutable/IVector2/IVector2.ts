import { Transform } from '@lndsld/fp';

import { Vector2 } from '../../types';

/**
 * Immutable version of two-dimensional vector
 * @public
 */
type IVector2 = Readonly<Vector2>;

/** @public */
declare namespace IVector2 {
	/** @internal */
	export interface API {
		/** Vector with zero length */
		Zero: IVector2;
		/** Vector pointing up */
		Up: IVector2;
		/** Vector pointing right */
		Right: IVector2;
		/** Vector pointing down */
		Down: IVector2;
		/** Vector pointing left */
		Left: IVector2;

		/** Create vector by coordinates */
		create(dx: number, dy: number): IVector2;
		/** Create vector by points */
		create(from: IVector2, to: IVector2): IVector2;

		/** Divide vector by number */
		divide(divider: number): Transform<IVector2>;
		/** Multiply vector by number */
		multiply(multiplier: number): Transform<IVector2>;
		/** Add vectors */
		add(vector: IVector2): Transform<IVector2>;
		/** Subtract vectors */
		subtract(vector: IVector2): Transform<IVector2>;

		/** Get vector length */
		getLength(vector: IVector2): number;
		/** Get vector normal with length equals 1 */
		getNormalized(vector: IVector2): IVector2;
		/** Compare two vectors */
		compare(vector1: IVector2, vector2: IVector2): boolean;
		/** Get vector with reversed direction */
		getReversed(vector: IVector2): IVector2;
		/** Compare direction of two vectors */
		compareDirection(vector1: IVector2, vector2: IVector2): boolean;
	}
}

/** @public */
const IVector2: IVector2.API = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	create: (a, b: any) => {
		return typeof a === 'number'
			? {
					x: a,
					y: b,
			  }
			: IVector2.subtract(b)(a);
	},

	Zero: { x: 0, y: 0 },
	Up: { x: 0, y: 1 },
	Right: { x: 1, y: 0 },
	Down: { x: 0, y: -1 },
	Left: { x: -1, y: 0 },

	getLength: ({ x, y }) => Math.sqrt(x * x + y * y),

	divide:
		(divider) =>
		({ x, y }) =>
			IVector2.create(x / divider, y / divider),

	multiply:
		(multiplier) =>
		({ x, y }) =>
			IVector2.create(x * multiplier, y * multiplier),

	add: (vector1) => (vector2) =>
		IVector2.create(vector1.x + vector2.x, vector1.y + vector2.y),

	subtract: (vector1) => (vector2) =>
		IVector2.create(vector1.x - vector2.x, vector1.y - vector2.y),

	getNormalized: (vector) => {
		const length = IVector2.getLength(vector);

		return IVector2.divide(length)(vector);
	},

	compare: (vector1, vector2) =>
		vector1.x === vector2.x && vector1.y === vector2.y,

	getReversed: ({ x, y }) => IVector2.create(x ? -x : 0, y ? -y : 0),

	compareDirection: (vector1, vector2) => {
		const normal1 = IVector2.getNormalized(vector1);
		const normal2 = IVector2.getNormalized(vector2);

		return IVector2.compare(normal1, normal2);
	},
};

export default IVector2;

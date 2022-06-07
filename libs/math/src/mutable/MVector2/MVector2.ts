import { Vector2 } from '../../types';

/**
 * Mutable version of two-dimensional vector
 * @public
 */
class MVector2 implements Vector2 {
	public x: number;
	public y: number;

	public constructor(vector: Vector2);
	public constructor(start: Vector2, end: Vector2);
	public constructor(x: number, y: number);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public constructor(xOrStart: Vector2 | number, yOrEnd?: any) {
		if (typeof xOrStart === 'number') {
			this.x = xOrStart;
			this.y = yOrEnd;
		} else if (yOrEnd === undefined) {
			this.x = yOrEnd.x - xOrStart.x;
			this.y = yOrEnd.y - xOrStart.y;
		} else {
			this.x = xOrStart.x;
			this.y = xOrStart.y;
		}
	}

	/** Add vector */
	public add(vector: Vector2): void {
		this.x += vector.x;
		this.y += vector.y;
	}

	/** Subtract vector */
	public subtract(vector: Vector2): void {
		this.x -= vector.x;
		this.y -= vector.y;
	}

	/** Multiply by number */
	public multiply(number: number): void {
		this.x *= number;
		this.y *= number;
	}

	/** Divide by number */
	public divide(number: number): void {
		this.x /= number;
		this.y /= number;
	}

	/** Create copy of vector */
	public copy(): MVector2 {
		return new MVector2(this);
	}
}

export default MVector2;

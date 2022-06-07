/**
 * Immutable version of number range
 *
 * Represents [from, to] range
 * @public
 */
type IRange2 = Readonly<[number, number]>;

/** @public */
declare namespace IRange2 {
	export interface API {
		/** Create range */
		create(start: number, end: number): IRange2;
		/** Create locality of number */
		createLocality(center: number, radius: number): IRange2;
		/** Check if range contains specified value */
		contains(value: number, range: IRange2): boolean;
		/** Get range length */
		getLength(range: IRange2): number;
		/** Checks if value is `IRange2` */
		isRange(value: unknown): value is IRange2;
	}
}

/** @public */
const IRange2: IRange2.API = {
	create: (start, end) => (start < end ? [start, end] : [end, start]),

	createLocality: (center, radius) =>
		IRange2.create(center - radius, center + radius),

	contains: (value, range) => value >= range[0] && value <= range[1],

	getLength: ([start, end]) => end - start,

	isRange: (value: unknown): value is IRange2 =>
		Array.isArray(value) && value.length === 2,
};

export default IRange2;

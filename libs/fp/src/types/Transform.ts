/**
 * Declaration for transform from A to B
 * @public
 */
type Transform<A, B = A> = (value: A) => B;

export default Transform;

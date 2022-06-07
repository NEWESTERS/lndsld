/**
 * Declaration for type predicate
 * @public
 */
type TypeGuard<A, B extends A> = (value: A) => value is B;

export default TypeGuard;

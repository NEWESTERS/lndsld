/**
 * Declaration for conditional predicate
 * @public
 */
type Predicate<A = unknown> = (value: A) => boolean;

export default Predicate;

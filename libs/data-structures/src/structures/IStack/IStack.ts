import { Predicate, Transform, TypeGuard } from '@lndsld/fp';

type IStack<T = unknown> = Readonly<Array<T>>;

declare namespace IStack {
	export type InferValue<S> = S extends IStack<infer T> ? T : never;

	export interface API {
		create<T>(): IStack<T>;

		push<T>(item: T): Transform<IStack<T>, IStack<T>>;

		pop<T>(stack: IStack<T>): IStack<T>;

		find: {
			<A, B extends A>(predicate: TypeGuard<A, B>): Transform<
				IStack<A>,
				B | undefined
			>;
			(predicate: Predicate<unknown>): <T>(
				stack: IStack<T>
			) => T | undefined;
			<A>(predicate: Predicate<A>): Transform<IStack<A>, A | undefined>;
		};

		has<T>(item: T): Transform<IStack<T>, boolean>;

		getLength(stack: IStack): number;

		getLast<T>(stack: IStack<T>): T | undefined;

		concat<A>(stackA: IStack<A>): <B>(stackB: IStack<B>) => IStack<A | B>;

		map<A, B>(
			callback: (item: A, index: number) => B
		): Transform<IStack<A>, IStack<B>>;
	}
}

const IStack = {
	create: () => [],

	push: (item) => (stack) => [...stack, item],

	pop: (stack) => stack.slice(0, -1),

	find: (predicate: any) => (stack: any) => stack.find(predicate),

	has: (item) => (stack) => stack.includes(item),

	getLength: (stack) => stack.length,

	getLast: (stack) => stack[stack.length - 1],

	concat: (stackA) => (stackB) => [...stackA, ...stackB],

	map: (callback) => (stack) => stack.map(callback),
} as IStack.API;

export default IStack;

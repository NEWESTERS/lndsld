import { IStack } from '../IStack';

import * as methods from './methods';

type IList<T = unknown> = IStack<T>;

declare namespace IList {
	export type InferValue<L> = IStack.InferValue<L>;
}

const IList = {
	...IStack,
	...methods
};

export default IList;

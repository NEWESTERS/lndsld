import { expectType, expectError } from 'tsd';

import IStack from './IStack';

// create

const stack = IStack.create<number>();

expectType<IStack<number>>(stack);

// push

expectType<IStack<number>>(IStack.push(1)(stack));

expectError(IStack.push('text')(stack));

// pop

expectType<IStack<number>>(IStack.pop(stack));

// has

expectType(IStack.has(1)(stack));

expectError(IStack.has('text')(stack));

// find

expectType<number | undefined>(IStack.find((value: number) => value === 1)(stack));

expectType<1 | undefined>(IStack.find((value: number): value is 1 => value === 1)(stack));

expectType<number | undefined>(IStack.find((value: unknown) => value === 1)(stack));

expectError(IStack.find((value: number): boolean => value > 1)(IStack.create<unknown>()));

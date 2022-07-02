import { expectType, expectError } from 'tsd';

import IList from './IList';

const list = IList.create<number>();

expectType<IList<number>>(IList.push(2)(list));

expectError(IList.push('text')(list));

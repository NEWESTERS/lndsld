import { TypeGuard } from '@lndsld/fp';
import { expectType } from 'tsd';

import IList from '../../IList';

const unknownList = IList.create<unknown>();

const isNumber: TypeGuard<unknown, number> = (value): value is number => typeof value === 'number';

expectType<IList<number>>(IList.filter(isNumber)(unknownList));

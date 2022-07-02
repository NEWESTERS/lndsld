import { pipe, Predicate } from '@lndsld/fp';

import IList from '../../IList';

const isOdd: Predicate<number> = (value) => value % 2 === 1;

describe('IList.filter', () => {
	it('returns values passing predicate', () => {
		const list = pipe(IList.create<number>(), IList.push(1), IList.push(2), IList.push(3));

		const onlyOdd = IList.filter(isOdd)(list);

		expect(onlyOdd).toEqual([1, 3]);
	});
});

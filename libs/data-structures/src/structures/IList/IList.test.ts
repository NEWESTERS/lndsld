import { Predicate, pipe } from '@lndsld/fp';

import IList from './IList';

const isOdd: Predicate<number> = (value) => value % 2 === 1;

describe('IList', () => {
	describe('removeIndex', () => {
		it('removes item with specified index', () => {
			const list = pipe(
				IList.create<number>(),
				IList.push(1),
				IList.push(2),
				IList.push(3),
				IList.removeIndex(1)
			);

			expect(list).toEqual([1, 3]);
		});
	});

	describe('filter', () => {
		it('returns values passing predicate', () => {
			const list = pipe(
				IList.create<number>(),
				IList.push(1),
				IList.push(2),
				IList.push(3)
			);

			const onlyOdd = IList.filter(isOdd)(list);

			expect(onlyOdd).toEqual([1, 3]);
		});
	});

	describe('sort', () => {
		it('should sort list', () => {
			const list = IList.create(3, 2, 1);

			const listAsc = pipe(
				list,
				IList.sort((a, b) => a - b)
			);

			expect(listAsc).toEqual(IList.create(1, 2, 3));
		});
	});
});

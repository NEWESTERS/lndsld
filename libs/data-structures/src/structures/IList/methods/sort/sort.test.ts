import { pipe } from '@lndsld/fp';

import IList from '../../IList';

describe('IList.sort', () => {
	it('should sort list', () => {
		const list = IList.create(3, 2, 1);

		const listAsc = pipe(
			list,
			IList.sort((a, b) => a - b)
		);

		expect(listAsc).toEqual(IList.create(1, 2, 3));
	});
});

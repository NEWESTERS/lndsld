import { pipe } from '@lndsld/fp';

import IList from '../../IList';

describe('IList.removeIndex', () => {
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

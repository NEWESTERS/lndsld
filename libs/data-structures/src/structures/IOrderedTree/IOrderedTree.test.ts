import { pipe } from '@lndsld/fp';

import IOrderedTree from './IOrderedTree';

describe('IOrderedTree', () => {
	describe('pushChild', () => {
		it('adds specified child to specified parent', () => {
			const rootKey = 'rootKey';
			const root = { text: 'Root' };
			const childKey = 'childKey';
			const child = { text: 'Child' };

			const tree = pipe(
				IOrderedTree.create(rootKey, root),
				IOrderedTree.pushChild(rootKey, childKey, child)
			);

			const rootChildrenKeys =
				IOrderedTree.getChildrenKeys(rootKey)(tree);

			expect(rootChildrenKeys).toContain(childKey);

			const rootChildren = IOrderedTree.getChildren(rootKey)(tree);

			expect(rootChildren).toContain(child);
		});
	});
});

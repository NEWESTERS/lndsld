import { pipe } from '@lndsld/fp';

import { ISet } from '../ISet';
import ITree from './ITree';

describe('ITree', () => {
	describe('addChild', () => {
		it('adds specified child to specified parent', () => {
			const rootKey = 'rootKey';
			const root = { text: 'Root' };
			const childKey = 'childKey';
			const child = { text: 'Child' };

			const tree = pipe(
				ITree.create(rootKey, root),
				ITree.addChild(rootKey, childKey, child)
			);

			const rootChildrenKeys = ITree.getChildrenKeys(rootKey)(tree);

			expect(ISet.has(childKey)(rootChildrenKeys)).toBe(true);

			const rootChildren = ITree.getChildren(rootKey)(tree);

			expect(rootChildren).toContain(child);
		});
	});
});

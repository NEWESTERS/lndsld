import { pipe, flow } from '@lndsld/fp';

import { ISet } from '../ISet';
import IKeyTree from './IKeyTree';

describe('IKeyTree', () => {
	describe('create', () => {
		it('creates empty tree with specified root key', () => {
			const tree = IKeyTree.create('root');

			expect(tree).toEqual({
				rootKey: 'root',
				structure: {
					root: {},
				},
			});
		});
	});

	describe('addChild', () => {
		it('add specified child to parent with specified key', () => {
			const root = 'root';
			const child = 'child';

			const tree = pipe(
				IKeyTree.create(root),
				IKeyTree.addChild(root, child)
			);

			const checkChild = flow(IKeyTree.getChildren(root), (children) =>
				children ? ISet.has(child)(children) : false
			);

			expect(checkChild(tree)).toBe(true);
		});

		it('returns original tree if unchanged', () => {
			const tree1 = pipe(
				IKeyTree.create('root'),
				IKeyTree.addChild('root', 'child')
			);

			const tree2 = IKeyTree.addChild('root', 'child')(tree1);

			expect(tree2).toBe(tree1);
		});
	});
});

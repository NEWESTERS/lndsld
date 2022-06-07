import { flow, pipe } from '@lndsld/fp';

import { AnyKey } from '../../types';
import { IList } from '../IList';
import IOrderedKeyTree from './IOrderedKeyTree';

describe('IOrderedKeyTree', () => {
	describe('create', () => {
		it('creates empty tree with specified root key', () => {
			const tree = IOrderedKeyTree.create('root');

			expect(tree).toEqual({
				rootKey: 'root',
				structure: {
					root: [],
				},
			});
		});
	});

	describe('pushChild', () => {
		it('add specified child to parent with specified key', () => {
			const root = 'root';
			const child = 'child';

			const tree = pipe(
				IOrderedKeyTree.create(root),
				IOrderedKeyTree.pushChild(root, child)
			);

			const checkChild = flow(
				IOrderedKeyTree.getChildren(root),
				(children) =>
					children ? IList.has<AnyKey>(child)(children) : false
			);

			expect(checkChild(tree)).toBe(true);
		});

		it('returns original tree if unchanged', () => {
			const tree1 = pipe(
				IOrderedKeyTree.create('root'),
				IOrderedKeyTree.pushChild('root', 'child')
			);

			const tree2 = IOrderedKeyTree.pushChild('root', 'child')(tree1);

			expect(tree2).toBe(tree1);
		});
	});
});

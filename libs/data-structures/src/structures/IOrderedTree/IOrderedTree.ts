import { flow, pipe, Transform } from '@lndsld/fp';

import { IRecord } from '../IRecord';
import { AnyKey } from '../../types';
import { IDictionary } from '../IDictionary';
import { IOrderedKeyTree } from '../IOrderedKeyTree';

interface IOrderedTree<V = unknown> {
	items: IDictionary<V>;
	keys: IOrderedKeyTree;
}

declare namespace IOrderedTree {
	export type InferValue<C> = C extends IOrderedTree<infer T> ? T : never;

	export interface API {
		create<V>(rootKey: AnyKey, rootItem: V): IOrderedTree<V>;

		pushChild<V>(
			parentKey: AnyKey,
			childKey: AnyKey,
			childItem: V
		): Transform<IOrderedTree<V>>;

		getChildrenKeys(
			parentKey: AnyKey
		): (tree: IOrderedTree) => AnyKey[] | undefined;

		getChildren(
			parentKey: AnyKey
		): <V>(tree: IOrderedTree<V>) => V[] | undefined;
	}
}

const IOrderedTree = {
	create: (rootKey, rootItem) => ({
		items: pipe(IDictionary.create(), IDictionary.set(rootKey, rootItem)),
		keys: IOrderedKeyTree.create(rootKey),
	}),

	pushChild: (parentKey, childKey, childItem) =>
		flow(
			// @ts-ignore
			IRecord.modify('items', IDictionary.set(childKey, childItem)),
			IRecord.modify(
				'keys',
				IOrderedKeyTree.pushChild(parentKey, childKey)
			)
		),

	getChildrenKeys: (parentKey) => (tree) =>
		IOrderedKeyTree.getChildren(parentKey)(tree.keys),

	getChildren: (parentKey) => (tree) =>
		pipe(
			tree.items,
			IDictionary.getMany(
				// @ts-ignore
				IOrderedKeyTree.getChildren(parentKey)(tree.keys)
			)
		),
} as IOrderedTree.API;

export default IOrderedTree;

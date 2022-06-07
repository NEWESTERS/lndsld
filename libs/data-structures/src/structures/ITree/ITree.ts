import { flow, pipe, Transform } from '@lndsld/fp';

import { IDictionary } from '../IDictionary';
import { IKeyTree } from '../IKeyTree';
import { IRecord } from '../IRecord';
import { ISet } from '../ISet';
import { AnyKey } from '../../types';

interface ITree<V = unknown> {
	readonly items: IDictionary<V>;
	readonly keys: IKeyTree;
}

declare namespace ITree {
	export type InferValue<C> = C extends ITree<infer T> ? T : never;

	export interface API {
		create<V>(rootKey: AnyKey, rootItem: V): ITree<V>;

		addChild<V>(
			parentKey: AnyKey,
			childKey: AnyKey,
			childItem: V
		): Transform<ITree<V>>;

		getChildrenKeys(parentKey: AnyKey): (tree: ITree) => ISet<AnyKey>;

		getChildren(parentKey: AnyKey): <V>(tree: ITree<V>) => V[];
	}
}
const ITree = {
	create: (rootKey, rootItem) => ({
		items: pipe(IDictionary.create(), IDictionary.set(rootKey, rootItem)),
		keys: IKeyTree.create(rootKey),
	}),

	addChild: (parentKey, childKey, childItem) =>
		flow(
			// @ts-ignore
			IRecord.modify('items', IDictionary.set(childKey, childItem)),
			IRecord.modify('keys', IKeyTree.addChild(parentKey, childKey))
		),

	getChildrenKeys: (parentKey) => (tree) =>
		// @ts-ignore
		IKeyTree.getChildren(parentKey, tree.keys)(tree.keys),

	getChildren: (parentKey) => (tree) =>
		pipe(
			tree.items,
			IDictionary.getMany(
				// @ts-ignore
				pipe(tree.keys, IKeyTree.getChildren(parentKey), ISet.toList)
			)
		),
} as ITree.API;

export default ITree;

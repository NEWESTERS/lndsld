import { flow, pipe, Transform } from '@lndsld/fp';

import { IRecord } from '../IRecord';
import { AnyKey } from '../../types';
import { IDictionary } from '../IDictionary';
import { IList } from '../IList';

interface IOrderedKeyTree<K extends AnyKey = string> {
	readonly rootKey: K;
	readonly structure: IDictionary;
}

declare namespace IOrderedKeyTree {
	export type InferValue<S> = S extends IOrderedKeyTree<infer T> ? T : never;

	export interface API {
		create<K extends AnyKey = string>(rootKey: K): IOrderedKeyTree<K>;

		pushChild<K extends AnyKey>(
			parentKey: K,
			childKey: K
		): Transform<IOrderedKeyTree<K>>;

		getChildren(
			parentKey: AnyKey
		): (tree: IOrderedKeyTree) => IList<AnyKey> | undefined;
	}
}

const IOrderedKeyTree = {
	create: (rootKey) => ({
		rootKey,
		structure: pipe(
			IDictionary.create(),
			IDictionary.set(rootKey, IList.create())
		),
	}),

	pushChild: (parentKey, childKey) => (tree) => {
		// @ts-ignore
		if (IList.has(childKey)(tree.structure[parentKey])) {
			return tree;
		}

		return IRecord.modify(
			'structure',
			flow(
				IDictionary.modify(parentKey, IList.push(childKey)),
				IDictionary.set(childKey, IList.create())
			)
		)(tree);
	},

	getChildren: (parentKey) => (tree) =>
		IDictionary.get(parentKey)(tree.structure),
} as IOrderedKeyTree.API;

export default IOrderedKeyTree;

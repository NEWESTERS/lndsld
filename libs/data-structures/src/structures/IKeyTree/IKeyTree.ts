import { flow, pipe, Transform } from '@lndsld/fp';

import { IDictionary } from '../IDictionary';
import { IRecord } from '../IRecord';
import { AnyKey } from '../../types';
import { ISet } from '../ISet';

interface IKeyTree {
	readonly rootKey: AnyKey;
	readonly structure: IDictionary<ISet<AnyKey>>;
}

declare namespace IKeyTree {
	export interface API {
		create(rootKey: AnyKey): IKeyTree;

		addChild(parentKey: AnyKey, childKey: AnyKey): Transform<IKeyTree>;

		getChildren(
			parentKey: AnyKey
		): (tree: IKeyTree) => ISet<AnyKey> | undefined;
	}
}

const IKeyTree = {
	create: (rootKey) => ({
		rootKey,
		structure: pipe(
			IDictionary.create(),
			IDictionary.set(rootKey, ISet.create())
		),
	}),

	addChild: (parentKey, childKey) => (tree) => {
		if (ISet.has(childKey)(tree.structure[parentKey])) {
			return tree;
		}

		return IRecord.modify(
			'structure',
			flow(
				// @ts-ignore
				IDictionary.modify(parentKey, ISet.add(childKey)),
				IDictionary.set(childKey, ISet.create())
			)
		)(tree);
	},

	getChildren: (parentKey) => (tree) =>
		IDictionary.get(parentKey)(tree.structure),
} as IKeyTree.API;

export default IKeyTree;

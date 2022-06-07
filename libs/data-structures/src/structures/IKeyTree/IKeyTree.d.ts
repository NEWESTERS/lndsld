import { Transform } from '@ts-essentials/fp';

import { AnyKey } from '../../types';
import { IDictionary } from '../IDictionary';
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

declare const IKeyTree: IKeyTree.API;

export default IKeyTree;

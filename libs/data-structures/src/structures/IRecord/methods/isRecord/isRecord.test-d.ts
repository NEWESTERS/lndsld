import { expectType } from 'tsd';

import IRecord from '../../IRecord';

expectType(() => {
	const a: object = {};

	if (IRecord.isRecord(a)) {
		const b: IRecord = a;
	}
});

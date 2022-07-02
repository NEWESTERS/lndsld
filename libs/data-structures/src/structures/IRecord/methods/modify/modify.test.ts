import { doNothing } from '@lndsld/fp';

import IRecord from '../../IRecord';

describe('IRecord.modify', () => {
	it('modifies specified key with specified value', () => {
		const rec1 = { foo: 1 };

		const rec2 = IRecord.modify('foo', (value: number) => value + 1)(rec1);

		expect(rec2.foo).toEqual(2);
	});

	it('returns original record if unchanged', () => {
		const rec1 = { foo: 1 };

		const rec2 = IRecord.modify('foo', doNothing)(rec1);

		expect(rec2).toEqual(rec1);
	});
});

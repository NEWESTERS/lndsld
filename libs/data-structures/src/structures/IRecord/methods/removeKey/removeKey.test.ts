import { pipe } from '@lndsld/fp';

import IRecord from '../../IRecord';

describe('IRecord.removeKey', () => {
	it('removes key from record', () => {
		const rec1 = { foo: 1, bar: 2 };

		const rec2 = pipe(rec1, IRecord.removeKey('bar'));

		expect(IRecord.hasKey('bar')(rec2)).toBe(false);
		expect(IRecord.hasKey('foo')(rec2)).toBe(true);
	});

	it('returns original record if key does not exist', () => {
		const rec1 = { foo: 1, bar: 2 };

		const rec2 = pipe(rec1, IRecord.removeKey('baz'));

		expect(rec2).toBe(rec1);
	});
});

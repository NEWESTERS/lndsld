import { doNothing, pipe } from '@lndsld/fp';

import IRecord from './IRecord';

describe('IRecord', () => {
	describe('set', () => {
		it('sets specified key with specified value', () => {
			const rec1 = { foo: 'bar' };

			const rec2 = IRecord.set('foo', 'baz')(rec1);

			expect(rec2.foo).toEqual('baz');
		});

		it('returns original record if unchanged', () => {
			const rec1 = { foo: 'bar' };

			const rec2 = IRecord.set('foo', 'bar')(rec1);

			expect(rec2).toEqual(rec1);
		});
	});

	describe('modify', () => {
		it('modifies specified key with specified value', () => {
			const rec1 = { foo: 1 };

			const rec2 = IRecord.modify(
				'foo',
				(value: number) => value + 1
			)(rec1);

			expect(rec2.foo).toEqual(2);
		});

		it('returns original record if unchanged', () => {
			const rec1 = { foo: 1 };

			const rec2 = IRecord.modify('foo', doNothing)(rec1);

			expect(rec2).toEqual(rec1);
		});
	});

	describe('removeKey', () => {
		it('removes key from record', () => {
			const rec1 = { foo: 1, bar: 2 };

			const rec2: Record<string, number> = pipe(
				rec1,
				IRecord.removeKey('bar')
			);

			expect(rec2.bar).toBeUndefined();
			expect(rec2.foo).not.toBeUndefined();
		});

		it('returns original record if key does not exist', () => {
			const rec1 = { foo: 1, bar: 2 };

			const rec2: Record<string, number> = pipe(
				rec1,
				IRecord.removeKey('baz')
			);

			expect(rec2).toBe(rec1);
		});
	});

	describe('get', () => {
		it('returns record property by key', () => {
			const rec = { foo: 1, bar: 'text' };

			expect(IRecord.get('foo')(rec)).toBe(rec.foo);
		});
	});
});

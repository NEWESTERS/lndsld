import moveToTarget from './moveToTarget';

describe('moveToTarget', () => {
	it('moves value down to specified target with specified speed', () => {
		const target = 0;
		const speed = 5;
		const value = 20;

		expect(moveToTarget(target)(speed)(value)).toEqual(15);
	});

	it('moves value up to specified target with specified speed', () => {
		const target = 0;
		const speed = 5;
		const value = -20;

		expect(moveToTarget(target)(speed)(value)).toEqual(-15);
	});

	it('returns target if value in target locality', () => {
		const target = 0;
		const speed = 5;
		const value = 3;

		expect(moveToTarget(target)(speed)(value)).toEqual(target);
	});
});

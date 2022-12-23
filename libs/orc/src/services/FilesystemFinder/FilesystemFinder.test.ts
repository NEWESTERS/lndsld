/* eslint-disable unicorn/prefer-module */
import path from 'node:path';

import { FilesystemFinder } from './FilesystemFinder';

describe('FilesystemFinder', () => {
	const finder = new FilesystemFinder();

	describe('findAll', () => {
		it('should find all index files', () => {
			const results = [
				...finder.findAll('index.ts', {
					startPath: __dirname
				})
			];

			expect(results).toContain(path.resolve(__dirname, 'index.ts'));
			expect(results).toContain(path.resolve(__dirname, '../index.ts'));
			expect(results).toContain(path.resolve(__dirname, '../../index.ts'));
		});

		it('should stop at defined directory', () => {
			const results = [
				...finder.findAll('index.ts', {
					startPath: __dirname,
					stopPath: path.resolve(path.resolve(__dirname, '..'))
				})
			];

			expect(results).toContain(path.resolve(__dirname, 'index.ts'));
			expect(results).toContain(path.resolve(__dirname, '../index.ts'));
		});
	});

	describe('findFirst', () => {
		it('should find local package json', () => {
			const result = finder.findFirst('package.json', { startPath: __dirname });

			expect(result).toBe(require.resolve('../../../package.json'));
		});
	});
});

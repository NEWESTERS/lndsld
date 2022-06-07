const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const { getPackageJson } = require('../utils');

const TS_REGEXP = /\.ts$/;

/** @type {() => import("webpack").Configuration} */
function createWebpackConfig() {
	const packageJson = getPackageJson();

	return {
		entry: path.resolve('src', 'index.ts'),
		mode: 'production',
		output: {
			path: path.resolve('lib'),
			filename: 'index.js',
			globalObject: 'this',
			library: {
				name: packageJson.name,
				type: 'umd',
			},
		},
		module: {
			rules: [
				{
					loader: require.resolve('babel-loader'),
					options: {
						cacheDirectory: true,
						babelrc: false,
						presets: [
							[
								'@babel/preset-env',
								{ targets: { browsers: 'last 2 versions' } },
							],
							'@babel/preset-typescript',
						],
					},
					test: TS_REGEXP,
				},
			],
		},
		plugins: [new CleanWebpackPlugin()],
		resolve: {
			extensions: ['.ts'],
		},
	};
}

module.exports = createWebpackConfig;

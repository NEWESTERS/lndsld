const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const package = require('./package.json');

/** @type {import("webpack").Configuration} */
module.exports = {
	entry: path.resolve('src', 'index.ts'),
	mode: 'production',
	output: {
		path: path.resolve('lib'),
		filename: 'math.js',
		globalObject: 'this',
		library: {
			name: package.name,
			type: 'umd',
		},
	},
	module: {
		rules: [
			{
				loader: 'babel-loader',
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
				test: /\.ts$/,
			},
		],
	},
	plugins: [new CleanWebpackPlugin()],
	resolve: {
		extensions: ['.ts'],
	},
};

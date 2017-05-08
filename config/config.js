const { resolve } = require('path');

const ROOT = resolve(__dirname, '../');

/*
	TODO
	- make customizable with config file
*/
const config = {
	entry: ['./src/index.js'],
	output: {
		filename: 'bundle.js',
		path: resolve(ROOT, 'build'),
		publicPath: '/',
	},

	devtool: 'inline-source-map',

	plugins: [],

	module: {
		rules: [
			{
				test: /\.js(x?)$/,
				exclude: [
					resolve(ROOT, 'node_modules/'),
					resolve(ROOT, 'bower_components/')
				],
				use: [
					{
						loader: 'babel-loader',
						// options specified in `.babelrc`
						options: {
							// plugins: [require('babel-plugin-transform-object-rest-spread')]
						}
					}
				]
			},
			{
				test: /\.(s?)css$/,
				use: [
					{
						loader: 'css-loader'
					},
					{
						loader: 'postcss-loader'
					},
					{
						loader: 'sass-loader',
						options: {}
					},
				]
			}
		]
	},

	resolve: {
		extensions: ['.js', '.jsx'],
		alias: {
			src: resolve(ROOT, 'src'),
			components: 'src/components'
		}
	}
}

module.exports = config;


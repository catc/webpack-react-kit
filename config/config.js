const path = require('path');

const ROOT = path.resolve(__dirname, '../');

/*
	TODO
	- make customizable with config file
*/

module.exports = {
	entry: './src/app.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(ROOT, 'build')
	},

	module: {
		rules: [
			{
				test: /\.js(x?)$/,
				exclude: [
					path.resolve(ROOT, 'node_modules/'),
					path.resolve(ROOT, 'bower_components/')
				],
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'env',
							'es2015',
							'react'
						],
						// plugins: [require('babel-plugin-transform-object-rest-spread')]
					}
				}
			}
		]
	},

	resolve: {
		extensions: ['.js', '.jsx'],
		alias: {
			src: path.resolve(ROOT, 'src')
		}
	}
}
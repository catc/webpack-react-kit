const { resolve } = require('path');
const webpack = require('webpack');
const devServer = require('webpack-dev-server')

const PORT = 8080
const ROOT = resolve(__dirname, '../');

/*
	TODO
	- make customizable with config file
*/
const config = {
	// PROD
	// entry: './src/index.js',

	// DEV
	// context: resolve(ROOT, 'src'), 	// REQ?
	entry: [
		'react-hot-loader/patch',
		'webpack-dev-server/client?http://localhost:8080',
		'webpack/hot/only-dev-server',
		'./src/index.js',
	],
	output: {
		filename: 'bundle.js',
		path: resolve(ROOT, 'build'),

		publicPath: '/',

		// TODO - set port
	},

	devtool: 'inline-source-map',

	// devServer: {
	// 	hot: true,
	// 	contentBase: resolve(__dirname, 'dist'),
	// 	publicPath: '/'
	// },

	plugins: [
		new webpack.HotModuleReplacementPlugin({
			// TODO - set quiet: true
		}),
		// enable HMR globally

		new webpack.NamedModulesPlugin(),
		// prints more readable module names in the browser console on HMR updates
	],

	module: {
		rules: [
			{
				test: /\.js(x?)$/,
				exclude: [
					resolve(ROOT, 'node_modules/'),
					resolve(ROOT, 'bower_components/')
				],
				use: [
					/*{
						loader: 'react-hot-loader'
					},*/
					'react-hot-loader/webpack',
					{
						loader: 'babel-loader',
						options: {
							presets: [
								// TODO - should be able to remove all of these since they're specified in .babelrc
								// 'env',
								// 'es2015',
								// 'react'
							],
							// plugins: [require('babel-plugin-transform-object-rest-spread')]
						}
					}
				]
			}
		]
	},

	resolve: {
		extensions: ['.js', '.jsx'],
		alias: {
			src: resolve(ROOT, 'src')
		}
	}
}

module.exports = config;

new devServer(webpack(config), {
	hot: true,
	publicPath: '/',
	contentBase: ROOT,
	
	stats: 'errors-only',
	clientLogLevel: 'none'
}).listen(PORT, '0.0.0.0', err => {
	if (err){
		throw new Error('webpack dev server error', err);
	}
	console.log(`Webpack dev server listening on port ${PORT}`)
})

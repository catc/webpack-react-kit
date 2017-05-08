const { resolve } = require('path');
const webpack = require('webpack');

const ROOT = resolve(__dirname, '../');

const config = require('./config');
const custom = require('../custom-config');

config.output.sourceMapFilename = '[name].map';
/*const ExtractTextPlugin = require('extract-text-webpack-plugin');

build.module.loaders.pop()
build.module.loaders.push({
	test: /\.(s?)css$/,
	loaders: [ExtractTextPlugin.extract('style-loader'), 'css-loader', 'postcss-loader', 'sass-loader']
})

build.postcss = () => {
	return [
		require('autoprefixer')({
			browsers: [
				'> 1%',
				'Safari 8',
				'Last 2 versions'
			]
		})
	];
}
*/

// add plugins
config.plugins = [
	new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV: JSON.stringify('production'),
		},
	}),
	new webpack.optimize.UglifyJsPlugin({
		sourceMap: custom.buildSourceMap ? custom.buildSourceMap : false,
		beautify: false,
		mangle: {
			screw_ie8: true,
			keep_fnames: true
		},
		compress: {
			screw_ie8: true
		},
		comments: false
	})
];

// build
webpack(config, err => {
	if (err){
		throw new Error('Error building bundle', err)
	}
	console.log(`Successfully built bundle in ${config.output.path}/${config.output.filename}`);
})
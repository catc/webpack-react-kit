const { resolve } = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const ROOT = resolve(__dirname, '../');

const config = require('./config');
const custom = require('../custom-config');

// source map
config.output.sourceMapFilename = '[name].map';

// required to omit css source maps (currently a bug with css-loader?)
config.devtool = false;

// css text extract
config.module.rules[1].use = ExtractTextPlugin.extract({
	use: [
		{
			loader: 'css-loader',
			options: {sourceMap: false}
		},
		{
			loader: 'sass-loader',
			options: {sourceMap: false}
		}
	]
});

// add plugins
config.plugins = [
	new ExtractTextPlugin('styles.css'),
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
const { resolve } = require('path');
const webpack = require('webpack');
const devServer = require('webpack-dev-server');

const custom = require('../custom-config');
const config = require('./config');

const ROOT = resolve(__dirname, '../');
const PORT = custom.port || 4800;

/*
	TODO
	- add support for proxy updating
		- ie: make sure HMR updates component on other urls?
			- doing <script src="http://localhost:8080/bundle.js"> still subscribes to updates
*/

// add hmr entries
config.entry.unshift('webpack/hot/only-dev-server');
config.entry.unshift(`webpack-dev-server/client?http://localhost:${PORT}`);
config.entry.unshift('react-hot-loader/patch');

// add hmr plugins
config.plugins.push(
	new webpack.HotModuleReplacementPlugin()
);
config.plugins.push(
	new webpack.NamedModulesPlugin()
);

// add loaders
config.module.rules[0].use.unshift('react-hot-loader/webpack');

// setup deb server config
const devServerConfig = {
	hot: true,
	publicPath: '/',
	contentBase: ROOT,

	// logging
	stats: 'errors-only',
	clientLogLevel: 'none',
	
}
if (custom.proxyPort){
	// add proxy for api requests
	devServerConfig.proxy = {
		'/': {
			target: `http://localhost:${custom.proxyPort}`,
			bypass: function(req){
				// proxy any api calls to external
				switch (req.path){
					case '/':
						return '/index.html';
					case '/bundle.js':
						return '/bundle.js'
					// TODO - add one for css
				}
			}
		}
	};
}

// start server
new devServer(webpack(config), devServerConfig).listen(PORT, '0.0.0.0', err => {
	if (err){
		throw new Error('webpack dev server error', err);
	}
	console.log(`Webpack dev server listening on port ${PORT}`)
})

## React webpack starter kit
Starter kit to provide ready-to-go webpack support for react. Useful for poc or simple projects.

## Goals
- babel + es6 support
- sass support
- hot reloading
- easily customisable
	- dev server port
	- path where to dump build
	- bundle name
	- proxy requests
	- source map
- DONE eslint
- add lodash
- instructions

```javascript

	// MAIN
	output: {
		path: path.join(__dirname, '/docs/build'),
		filename: './bundle.js',
		publicPath: 'build/'
	},

	// DEV
	publicPath: '/build/',
	contentBase: './docs',

	hot: true,
	stats: {
		cached: false,
		cachedAssets: false,
		colors: true,
		exclude: ['node_modules', 'components'],
	},
```

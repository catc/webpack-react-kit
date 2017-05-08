## React webpack starter kit
Starter kit to provide ready-to-go webpack support for react. Useful for poc or simple projects.

## Goals
- babel + es6 support
- sass support
	- https://webpack.js.org/guides/migrating/#dedupeplugin-has-been-removed
- hot reloading
- easily customisable
	- DONE dev server port
	- path where to dump build
	- bundle name
	- DONE proxy requests
	- DONE source map
- DONE eslint
- add lodash
- instructions




## `custom-config.js`
Override webpack defaults to your own development environment.

#### `proxyPort`
Allows you to proxy api requests to different host.

Eg: setting the `proxyPort: 1234` will result in all requests to `localhost:4800/some_endpoint` will be proxied to `localhost:1234/some_endpoint`.

## Developing on own server
You can develop and serve the bundle from your own server but still support hot module reloading.
1. In your html file, including the bundle via: `<script type="text/javascript" src="http://localhost:4800/bundle.js"></script>
2. Add a `<div id="root"></div> to your html

Any changes should be reflected accordingly.

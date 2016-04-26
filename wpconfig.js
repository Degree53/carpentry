/* eslint-disable */

var webpack = require('webpack');

module.exports = function (entryPath) {
	var config = {
		debug: true,
		devtool: 'source-map',
		entry: {
			app: entryPath
		},
		module: {
			loaders: [{
				exclude: /node_modules/,
				loader: 'babel',
				query: {
					cacheDirectory: true,
					presets: ['es2015', 'react']
				},
				test: /\.jsx?$/
			}]
		},
		output: {
			filename: '[name].js'
		},
		resolve: {
			extensions: ['', '.js', '.jsx']
		}
	};
	
	delete config.output.path;
	
	return config;
}

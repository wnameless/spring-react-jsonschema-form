'use strict';
var path = require('path');

module.exports = {
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			},
			{
				test: /\.css$/,
				loaders: ['style-loader', 'css-loader']
			},
			{
				test: /\.(png|woff|woff2|eot|ttf|svg)$/,
				use: 'url-loader?limit=100000'
			},
			{
				test: /\.png$/,
				use: 'url-loader?limit=100000'
			},
			{
				test: /\.jpg$/,
				use: 'file-loader'
			},
			{
				test: /\.(woff|woff2) (\?v=\d+\.\d+\.\d+)?$/,
				use: 'url-loader?limit=10000&mimetype=application/font-woff'
			},
			{
				test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
				use: 'url-loader?limit=10000&mimetype=application/octet-stream'
			},
			{
				test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
				use: 'file-loader'
			},
			{
				test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
				use: 'url-loader?limit=10000&mimetype=image/svg+xml'
			}
		]
	},
	output: {
		library: 'ReactJSF',
		libraryTarget: 'var',
		libraryTarget: 'umd',
		filename: 'bundle.js',
		path: path.resolve(__dirname, '../resources/static/js'),
	},
};
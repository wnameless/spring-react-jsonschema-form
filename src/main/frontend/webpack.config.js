'use strict';
var path = require('path');

module.exports = {
	externals: {
		axios: 'axios',
		jquery: 'jQuery',
		react: {
			root: 'React',
			commonjs2: 'react',
			commonjs: 'react',
			amd: 'react',
			umd: 'react',
		},
		'react-dom': {
			root: 'ReactDOM',
			commonjs2: 'react-dom',
			commonjs: 'react-dom',
			amd: 'react-dom',
			umd: 'react-dom',
		}
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			},
			// {
			// 	test: /\.css$/,
			// 	loaders: ['style-loader', 'css-loader']
			// },
			// {
			// 	test: /\.(png|woff|woff2|eot|ttf|svg)$/,
			// 	use: 'url-loader?limit=100000'
			// },
			// {
			// 	test: /\.png$/,
			// 	use: 'url-loader?limit=100000'
			// },
			// {
			// 	test: /\.jpg$/,
			// 	use: 'file-loader'
			// },
			// {
			// 	test: /\.(woff|woff2) (\?v=\d+\.\d+\.\d+)?$/,
			// 	use: 'url-loader?limit=10000&mimetype=application/font-woff'
			// },
			// {
			// 	test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
			// 	use: 'url-loader?limit=10000&mimetype=application/octet-stream'
			// },
			// {
			// 	test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
			// 	use: 'file-loader'
			// },
			// {
			// 	test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
			// 	use: 'url-loader?limit=10000&mimetype=image/svg+xml'
			// }
		]
	},
	output: {
		library: 'ReactJSF',
		libraryTarget: 'var',
		libraryTarget: 'umd',
		filename: 'react-jsf.js',
		path: path.resolve(__dirname, '../resources/static/js'),
	},
};
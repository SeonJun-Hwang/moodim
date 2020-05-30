var path = require("path");
var webpack = require("webpack")
var TerserWebpack = require("terser-webpack-plugin");
require("dotenv");

module.exports = {
	mode: process.env.production ? "production" : "development",
	devtool: "source-map",
	entry: "./lib/index.ts",
	output: {
		filename: "index.js",
		path: path.join(__dirname, "dist")
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js"],
		alias: {
			"~": path.resolve(__dirname, "./lib"),
			"~strategy": path.resolve(__dirname, "./lib/strategy"),
			"~types": path.resolve(__dirname, "./lib/@types"),
			"~utils": path.resolve(__dirname, "./lib/utils"),
		}
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				use: {
					loader: "ts-loader"
				}
			}
		],
	},
	optimization: {
		minimize: process.env.production,
		minimizer: [
			new TerserWebpack({
				sourceMap: true,
				extractComments: process.env.production,
				terserOptions: {
					warnings: false,
					compress: {
						drop_console: process.env.production
					}
				}
			})
		]
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jquery: 'jquery',
			"window.jQuery": 'jquery',
		}),
	]
};

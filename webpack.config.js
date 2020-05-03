var path = require("path");
var HtmlWebpack = require("html-webpack-plugin");
var TerserWebpack = require("terser-webpack-plugin");
require("dotenv");

module.exports = {
	mode: process.env.production ? "production" : "development",
	entry: {
		index: ["@babel/polyfill", "./src/index.js"],
		one: ["@babel/polyfill", "./src/1mb.js"],
		tag: ["@babel/polyfill", "./src/tags.js"],
		"key-value": ["@babel/polyfill", "./src/key-value.js"],
		html: ["@babel/polyfill", "./src/html.js"]
	},
	output: {
		filename: "[name]-bundle.js",
		path: path.join(__dirname, "dist")
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"]
					}
				}
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"]
			}
		]
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
};

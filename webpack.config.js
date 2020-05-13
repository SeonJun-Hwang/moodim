var path = require("path");
var webpack = require("webpack")
var HtmlWebpack = require("html-webpack-plugin");
var TerserWebpack = require("terser-webpack-plugin");
require("dotenv");

module.exports = {
	mode: process.env.production ? "production" : "development",
	devtool: "eval",
	entry: ["./src/index.ts"],
	output: {
		filename: "bundle.js",
		path: path.join(__dirname, "dist")
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".json"],
		alias: {
			"~src": path.resolve(__dirname, "src"),
			"~style": path.resolve(__dirname, "style"),
			"~assets": path.resolve(__dirname, "assets"),
			"~components": path.resolve(__dirname, "src/components"),
			"~controller": path.resolve(__dirname, "src/controller"),
			"~api": path.resolve(__dirname, "src/api"),
			"~model": path.resolve(__dirname, "src/model"),
			"~utils": path.resolve(__dirname, "src/utils"),
			"~types": path.resolve(__dirname, "src/types")
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
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"]
			},
			{
				test: /\.(jpg|jpeg|gif|svg|png)$/,
				use: ["file-loader"]
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
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jquery: 'jquery',
			"window.jQuery": 'jquery',
		}),
		new HtmlWebpack({
			title: "Index",
			template: "./public/index.html",
			filename: "./index.html"
		})
	]
};

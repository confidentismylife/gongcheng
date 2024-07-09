
import {resolve} from 'path';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
const PROJECT_PATH = path.resolve(__dirname, '../');
const PLUGINS = [
	// 配置html，自动引入打包出的js文件
	new HtmlWebpackPlugin({
		template: resolve(PROJECT_PATH, './public/index.html'),
		filename: 'index.html',
		cache: false,
		minify: 
			{
					removeAttributeQuotes: true,
					collapseWhitespace: true,
					removeComments: true,
					collapseBooleanAttributes: true,
					collapseInlineTagWhitespace: true,
					removeRedundantAttributes: true,
					removeScriptTypeAttributes: true,
					removeStyleLinkTypeAttributes: true,
					minifyCSS: true,
					minifyJS: true,
					minifyURLs: true,
					useShortDoctype: true,
				},
	}),
];

module.exports = {
	mode: 'development',
	entry: {
		app: resolve(PROJECT_PATH, './src/app.js'),
	},
	output: {
		filename: `js/[name]${'.[hash:8]'}.js`,
		path: resolve(PROJECT_PATH, './dist'),
	},
	plugins: PLUGINS,

    devServer: {
        client: {
            logging: 'info',
        },
        compress: true,
        open: true,
        hot: true,
    },
};


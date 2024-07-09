import {fileURLToPath} from 'url'; // 导入fileURLToPath函数，用于将文件URL转换为文件路径
import {resolve, dirname} from 'path'; // 导入resolve和dirname函数，用于处理文件路径
import HtmlWebpackPlugin from 'html-webpack-plugin'; // 导入HtmlWebpackPlugin模块，用于生成HTML文件
import {CleanWebpackPlugin} from 'clean-webpack-plugin';
const __filename = fileURLToPath(import.meta.url); // 获取当前文件的路径
const __dirname = dirname(__filename); // 获取当前文件所在目录的路径

const PROJECT_PATH = resolve(__dirname, '../'); // 获取项目根目录的路径
const PLUGINS = [
	// 配置html，自动引入打包出的js文件
	new HtmlWebpackPlugin({
		template: resolve(PROJECT_PATH, '../public/index.html'), // 指定HTML模板文件的路径
		filename: 'index.html', // 指定生成的HTML文件的名称
		cache: false, // 禁用缓存
		minify: {
			removeAttributeQuotes: true, // 移除属性的引号
			collapseWhitespace: true, // 折叠空白字符
			removeComments: true, // 移除注释
			collapseBooleanAttributes: true, // 折叠布尔属性
			collapseInlineTagWhitespace: true, // 折叠内联标签的空白字符
			removeRedundantAttributes: true, // 移除冗余的属性
			removeScriptTypeAttributes: true, // 移除脚本类型属性
			removeStyleLinkTypeAttributes: true, // 移除样式和链接类型属性
			minifyCSS: true, // 压缩CSS
			minifyJS: true, // 压缩JS
			minifyURLs: true, // 压缩URL
			useShortDoctype: true, // 使用短的文档类型
		},
	}),
	new CleanWebpackPlugin(),
];

export default {
	mode: 'development', // 设置构建模式为开发模式
	entry: {
		app: resolve(PROJECT_PATH, '../src/app.js'), // 指定入口文件的路径
	},
	output: {
		filename: `js/[name]${'.[hash:8]'}.js`, // 指定输出文件的名称
		path: resolve(PROJECT_PATH, './dist'), // 指定输出文件的目录
	},
	plugins: PLUGINS, // 配置插件
	devServer: {
		client: {
			logging: 'info', // 设置客户端日志级别为info
		},
		compress: true, // 启用gzip压缩
		open: true, // 自动打开浏览器
		hot: true, // 启用热模块替换
	},
	devtool: 'eval-source-map',
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: false, // 默认就是 false, 若要开启，可在官网具体查看可配置项
							sourceMap: true, // 开启后与 devtool 设置一致, 开发环境开启，生产环境关闭
							importLoaders: 0, // 指定在 CSS loader 处理前使用的 laoder 数量
						},
					},
				],
			},
			{
				test: /\.less$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: false,
							sourceMap: true,
							importLoaders: 1, // 需要先被 less-loader 处理，所以这里设置为 1
						},
					},
					{
						loader: 'less-loader',
						options: {
							sourceMap: true,
						},
					},
				],
			},
			{
				test: /\.scss$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: false,
							sourceMap: true,
							importLoaders: 1, // 需要先被 sass-loader 处理，所以这里设置为 1
						},
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
						},
					},
				],
			},
			// 处理图片、文件、字体
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.txt/,
				type: 'asset/source',
			},
			{
				// 通用文件则使用 asset，此时会按照默认条件自动决定是否转换为 Data URI
				test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
				type: 'asset',
				parser: {
					// 如果文件大小小于 8kb，那么会转换为 data URI，否则为单独文件。
					// 8kb 是默认值，你可以根据需要进行调整
					dataUrlCondition: {
						maxSize: 8 * 1024, // 8kb
					},
				},
			},
		],
	},
};

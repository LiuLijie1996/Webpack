const path = require("path");
const entry = require("./entry");
const htmlPlugin = require("./htmlPlugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    devtool: "source-map",
    entry: entry,//入口文件
    output: {
        path: path.resolve(__dirname, "../dist"),//输出目录
        filename: "js/[name].js",
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },

    module: {
        rules: [
            // ts解析
            {
                test: /\.tsx?$/,
                exclude: [path.resolve(__dirname, "node_modules")],
                loader: "ts-loader",
                enforce: "pre",
            },
            // js语法兼容
            {
                test: /\.ts/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: [
                        [
                            "@babel/preset-env",
                            {
                                // 按需加载
                                useBuiltIns: "usage",
                                // 指定core-js版本
                                corejs: {
                                    version: 3,
                                },
                                // 指定兼容性做到哪个版本的浏览器
                                targets: {
                                    chrome: "60",
                                    firefox: "50",
                                    ie: "9"
                                }
                            },
                        ],
                    ]
                }
            },

            // 样式解析
            {
                // 匹配哪些文件
                test: /\.(css|scss)$/,
                // 使用哪些loader进行处理
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        'postcss-preset-env',
                                    ],
                                ],
                            },
                        },
                    },
                    "sass-loader",
                ]
            },

            // 图片解析
            {
                // 处理图片资源
                test: /\.(jpg|jpeg|png|gif)$/,
                // 使用一个loader
                loader: "url-loader",
                options: {
                    limit: 13 * 1024,
                    // 关闭es6模块化引入方式
                    esModule: false,
                    // 给图片进行重命名
                    name: "[hash:10].[ext]",
                    // 图片公共路径
                    publicPath: "/images",
                    // 图片存放目录
                    outputPath: "images",
                }
            },
            {
                test: /\.html$/,
                // 处理html文件中的img图片（负责引入img，从而能被url-loader进行处理）,
                loader: "html-loader",
            },

            // 打包其他资源（除了html/js/css资源以外的资源）
            {
                // 排除css/js/html/scss资源
                exclude: /\.(html|js|ts|css|scss|less|jpg|jpeg|png|gif)$/,
                loader: "file-loader",
                options: {
                    name: "[name].[ext]",
                    publicPath: "/iconfont",//公共路径
                    outputPath: "iconfont",//文件存放目录
                }
            }
        ]
    },

    plugins: [
        // 打包前先删除输出目录的所有文件
        new CleanWebpackPlugin(),

        // 将css单独打包成一个文件
        new MiniCssExtractPlugin({
            filename: "css/[name].css",//打包后的css文件名称
        }),

        // 压缩css代码
        new OptimizeCssAssetsPlugin(),

        ...htmlPlugin,//模板文件
    ],

    optimization: {
        // 代码分割
        splitChunks: {
            chunks: "all",
            minChunks: 1,//要提取的chunk最少被引用1次
        },
    },
}
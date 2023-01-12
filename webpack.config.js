const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const dotenv = require('dotenv');
const { DefinePlugin } = require("webpack");
module.exports = (env, options) => {
    if (options.mode === 'development') {
        dotenv.config({path: path.resolve(__dirname, '.env.development')});
    } else {
        dotenv.config({path: path.resolve(__dirname, '.env.production')});
    }
    const { GITHUB_BASEURL, GITHUB_TOKEN } = process.env;

    const config = {
        entry: path.resolve(__dirname, 'src/app.js'),
        module: {
            rules: [
                {
                    test: /\.(jpg|jpeg|gif|png|svg|ico)?$/,
                    type: "asset/resource"
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        "style-loader",
                        "css-loader",
                        "sass-loader"
                    ]
                },
                {
                    test: /\.css$/i,
                    use: [
                        "style-loader",
                        "css-loader"
                    ]
                }
            ]
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].[contenthash].js',
            assetModuleFilename: '[name][ext]',
            clean: true
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: './src/index.html',
            }),
            new DefinePlugin({
                GITHUB_BASEURL: JSON.stringify(GITHUB_BASEURL),
                GITHUB_TOKEN: JSON.stringify(GITHUB_TOKEN)
            })
        ],
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src/"),
                "@controller": path.resolve(__dirname, "./src/controller/"),
                "@services": path.resolve(__dirname, "./src/services/"),
                "@styles": path.resolve(__dirname, "./src/styles/")
            },
            extensions:[".js",".jsx",".css"]
        },
        devServer: {
            watchFiles: [
                "src/**"
            ],
            port: 3000,
        },
        cache: false,
    }

    return config;
}
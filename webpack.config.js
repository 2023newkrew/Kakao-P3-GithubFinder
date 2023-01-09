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
    const { GITHUB_BASEURL } = process.env;

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
        plugins: [
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: './index.html',
            }),
            new DefinePlugin({
                GITHUB_BASEURL: JSON.stringify(GITHUB_BASEURL)
            })
        ],
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src/"),
                "@services": path.resolve(__dirname, "./src/services/"),
            },
            extensions:[".js",".jsx",".css"]
        },
        devServer: {
            watchFiles: [
                "src/**",
                "index.html"
            ],
            port: 3000,
        }
    }

    return config;
}
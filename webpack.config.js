const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
module.exports = (env, options) => {
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
            })
        ],
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src/"),
                "@assets": path.resolve(__dirname, "./src/assets/"),
                "@scripts": path.resolve(__dirname, "./src/scripts/"),
                "@styles": path.resolve(__dirname, "./src/styles/"),
                "@view": path.resolve(__dirname, "./src/views/"),
            },
            extensions:[".js",".jsx",".css"]
        }
    }

    if (options.mode === 'development') {
        config.devServer = {
            watchFiles: [
                "src/**",
                "index.html"
            ],
            port: 3000,
        }
    } else {

    }

    return config;
}
var path = require('path'),
    webpack = require("webpack"),
    ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    debug: true,
    devtool: 'eval-source-map',
    entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        './src/app.jsx'
    ],
    devServer: {
        colors: true,
        historyApiFallback: true,
        inline: false,
        port: 3000,
        hot: true
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    module: {
        loaders: [{
                loader: 'babel',
                include: path.resolve(__dirname, "src"),
                test: /\.(js|jsx|es)$/,
                exclude: /(node_modules|bower_components)/,
                query: {
                    plugins: ["react-hot-loader/babel"],
                    presets: ['es2015', 'stage-0', 'react'],
                }
            },
            /*uncomment for prod*/
            // {
            //   test: /\.(css|less)$/,
            //   include: path.resolve(__dirname, "styles"),
            //   exclude: /(node_modules|bower_components)/,
            //   loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
            // },
            /*comment for prod*/
            {
                test: /\.(css|less)$/,
                include: path.resolve(__dirname, "src"),
                exclude: /(node_modules|bower_components)/,
                loader: "style!css!less"
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.es', '.jsx', '.json']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('"production"')
            }
        }),
        /*uncomment for prod*/
        // new ExtractTextPlugin('/index.css', { allChunks: true }),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin()
    ]
};

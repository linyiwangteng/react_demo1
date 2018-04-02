var path = require('path');
var CleanWebpackPlugin  = require('clean-webpack-plugin');

var HtmlWebpackPlugin = require('html-webpack-plugin');

const webpack = require('webpack');

module.exports = {
    devtool:'inline-source-map',
    // entry:__dirname+'/app.js',
    entry:{
        'main_file':'./app.js',
        'other_file':'./other.js'
    },

    output:{
        path:__dirname+'/dist',
        filename:'[name].bundle[chunkhash].js',
        publicPath:'/'
        
    },
    module:{
        rules:[
            {
                test:/\.js|jsx?$/,
                loader:'babel-loader',
                exclude:/node_modules/,
                query:{
                    presets:['es2015','react']
                }
            }
        ]
    },
    resolve:{
        extensions: ['.coffee','.js']
    },
    devServer:{
        contentBase:path.join(__dirname,'dist'),
        compress:true,
        // hot:true,
        port:9000
    },
    plugins:[
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({title:'hello wanteng',template:'./index.html'}),
        // new webpack.NamedModulesPlugin(),
        // new webpack.HotModuleReplacementPlugin()
    ]


}
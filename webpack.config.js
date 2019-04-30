const webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');


module.exports = {
  entry: './src/app.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath:'/dist/',
    filename: 'js/app.js'
  },
  module: {
    rules: [{
      test: /\.js|jsx$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env','react']
        }
      }
    },
    {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: "css-loader"
      })
    },{
      test:/\.scss$/,
      use:ExtractTextPlugin.extract({
        fallback:'style-loader',
        use:['css-loader','sass-loader']
      })
    }, {
      test:/\.(png|jpg|gif)/,
      use:[
        {
          loader: 'url-loader',
          options: {
            limit: 8192,
            name:'resource/[name].[ext]'
          }
        }
      ]
    },{
      test:/\.(woff|woff2|eot|ttf|svg)$/,
      use:[{
        loader:'url-loader',
        options: {
          limit:8192,
          name:'resource/[name].[ext]'
        }
      }]
    }]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:'./src/index.html'
    }),
    new ExtractTextPlugin("css/[name].css"),
    new webpack.optimize.CommonsChunkPlugin({
      name:'common',
      filename:'js/base.js'
    })
  ],
  devServer: {
    // contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000
  }
};
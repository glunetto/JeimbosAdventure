
const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
   entry: './tmp/index.js',
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/bundle.js'
   },
   module: {
      rules: [{
         test: /\.scss$/,
         use: [
            MiniCssExtractPlugin.loader,
            {
               loader: 'css-loader'
            },
            {
               loader: 'sass-loader',
               options: {
                  sourceMap: true,
                  // options...
               }
            }
         ]
      }]
   },
   plugins: [
      new MiniCssExtractPlugin({
         filename: 'css/index.css'
      }),
      new HtmlWebpackPlugin({
         title: 'Jeimbo\'s Adventure',
         filename: 'index.html',
         template: 'assets/index.html',
         //favicon: 'assets/img/maskable_icon.png',
         //inject: 'head',
         scriptLoading: 'defer',
         //excludeChunks: ['service-worker', 'worker']
      })
   ]
};
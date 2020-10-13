const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const fs = require('fs');

function getDataJson() {
  let data = fs.readdirSync(path.join(__dirname, 'data'))
              .filter(filename => filename.substring(filename.length - 5) == '.json')
              .map(filename => fs.readFileSync(path.join(__dirname, 'data', filename)))
              .map(content => JSON.parse(content))
              .reduce((data, json) => Object.assign(data, json));

  if(!data.config) {
    throw new Error('ERROR: config is required');
  }
  return data;
}

module.exports = {
  entry: path.join(__dirname, 'src/main/script/index.js'),
  output: {
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.hbs.html$/,
        loader: 'handlebars-loader?helperDirs[]=' + __dirname + '/build/helpers'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader'
        }]
      },

      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader" // translates CSS into CommonJS
          },
          {
            loader: "sass-loader" // compiles Sass to CSS
          }
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true, // webpack@2.x and newer
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/'
          }
        }]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/main/template/index.hbs.html'),
      templateParameters: getDataJson()
    }),
    new CopyPlugin({patterns: [
      { from: path.join(__dirname, 'assets'), to: path.join(__dirname, 'dist/img') }
    ]}),
    new webpack.HotModuleReplacementPlugin()
  ],
  optimization: {
    splitChunks: {
      automaticNameDelimiter: '-',
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          name: 'vendor',
          test: /node_modules/,
          enforce: true
        },
      }
    }
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    hot: true
  }
};

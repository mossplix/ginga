const webpack = require('webpack');
const path = require('path');
const buildPath = path.resolve(__dirname, 'build');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TransferWebpackPlugin = require('transfer-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");






const config = {
  //Entry point to the project
  entry: [
    path.join(__dirname, 'web/static/js/app/app.js'), "./web/static/css/application.sass","./web/static/css/app.css"
  ],
  //Webpack config options on how to obtain modules
  resolve: {
    modulesDirectories: ["node_modules", __dirname + "/web/static/js/app" ],
    //When requiring, you don't need to add these extensions
    extensions: ['', '.js', '.md', '.txt','.sass','.jsx'],
    alias: {
      //material-ui requires will be searched in src folder, not in node_modules
      'material-ui/lib': path.resolve(__dirname, 'web/static/js/material_ui/src'),
      'material-ui': path.resolve(__dirname, 'web/static/js/material_ui/src'),
      'phoenix_html':path.resolve(__dirname + "/deps/phoenix_html/web/static/js/phoenix_html.js"),
      'phoenix':path.resolve(__dirname + "/deps/phoenix/web/static/js/phoenix.js"),
      'jquery':path.resolve(__dirname + "/node_modules/jquery/dist/jquery.js"),
        'jquery-dragster': path.resolve(__dirname, 'web/static/js/non-node-modules/jquery-dragster'),

    },
  },
  devtool: 'source-map',
  //Configuration for server
  devServer: {
    contentBase: 'build',
  },
  //Output file config
  output: {
    path:  "./priv/static",    //Path of output file
    filename: 'js/bundle.js',  //Name of output file
  },
  plugins: [
       new webpack.ProvidePlugin({
            'window.jQuery': 'jquery'
        }),

    new webpack.HotModuleReplacementPlugin(),//dev only

    //Allows error warninggs but does not stop compiling. Will remove when eslint is added
    new webpack.NoErrorsPlugin(),
      new ExtractTextPlugin("css/application.css"),
       new ExtractTextPlugin("css/app.css"),
      new CopyWebpackPlugin([{ from: "./web/static/assets" }]),

       new CopyWebpackPlugin([
            {from: 'images/emoji', to: 'emoji'},
            {from: 'images/logo-email.png', to: 'images'},
            {from: 'images/circles.png', to: 'images'}
        ]),


  ],
  externals: {
    fs: 'fs', // To remove once https://github.com/benjamn/recast/pull/238 is released
  },
  module: {
    //Allow loading of non-es5 js files.
      noParse: [/vendor\/phoenix/,/autoit.js/],
      loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
          {
                test: /(non-node-modules)\/.+\.(js|jsx)$/,
                loader: 'imports',
                query: {
                    $: 'jquery',
                    jQuery: 'jquery'
                }
            },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.txt$/,
        loader: 'raw-loader',
        include: path.resolve(__dirname, 'web/static/js/app/components/raw-code'),
      },
      {
        test: /\.md$/,
        loader: 'raw-loader',
      },
      {
          test: /\.css$/,
          loaders: ['style', 'css'],
            },
           {
        test: /\.sass$/,
        loader: ExtractTextPlugin.extract('style', 'css!sass?indentedSyntax&includePaths[]=' + __dirname +  '/node_modules'),
      },

          {
                test: /\.(png|eot|tiff|svg|woff2|woff|ttf|gif|mp3|jpg)$/,
                loader: 'file',
                query: {
                    name: 'files/[hash].[ext]'
                }
            }

    ],
  },
  eslint: {
    configFile: '.eslintrc',
  },
};/*
if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
      new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      }})
  );}

*/
module.exports = config;

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CopyPlugin = require("copy-webpack-plugin")
// const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: "development",
  entry: './src/index.js',
  // output: {
  //   filename: 'bundle.js',
  //   path: path.resolve(__dirname, 'dist'),
  //   clean: true
  // },
  resolve: {
    modules: ['node_modules'],
  },
  devtool: "eval",
  devServer: {
    watchFiles: ['src/**/*'],
    static: {
      directory: path.join(__dirname, 'src')
    },
    port: 5000,
    compress: true,
    hot: true,
  },

  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 300,
  },

  performance: {
    hints: false
  },

  // optimization: {
  //   minimize: true,
  //   minimizer: [
  //     new CssMinimizerPlugin(),
  //     new TerserPlugin({
  //       terserOptions: {
  //         format: {
  //           comments: false,
  //         },
  //       },
  //       extractComments: false,
  //     }),
  //     // Other minimizers if needed
  //   ],
  // },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // your HTML template file
    }),
    // new CopyPlugin({
    //   patterns: [
    //     {
    //       from: './src/styles', to: "styles"
    //     },
    //     {
    //       from: './src/assets', to: "assets"
    //     }
    //   ]
    // }),
  ],

  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg|avif|jpeg)$/i,
        use: ['file-loader'],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ]
          }
        }
      }
    ]
  }

};
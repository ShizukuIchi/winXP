const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src/index.tsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'auto',
    clean: true
  },
  devtool: 'source-map',
  devServer: {
    port: 3108,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    },
    static: [
      {
        directory: path.resolve(__dirname, '../../src/assets'),
        publicPath: '/assets',
      }
    ],
    hot: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      'assets': path.resolve(__dirname, '../../src/assets'),
      'types': path.resolve(__dirname, '../../src/types'),
    }
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: { browsers: ['>0.2%', 'not dead'] } }],
              ['@babel/preset-react', { runtime: 'classic' }]
            ]
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(mp3|wav|ogg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      }
    ]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'xpDemoApp',
      filename: 'remoteEntry.js',
      remotes: {
        'xpComponents': 'xpComponents@http://localhost:3107/remoteEntry.js'
      },
      exposes: {
        './App': './src/bootstrap'
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: '^16.8.6'
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '^16.8.6'
        },
        'styled-components': {
          singleton: true,
          requiredVersion: '^4.2.0'
        }
      }
    }),
    new HtmlWebpackPlugin({
      templateContent: `<!doctype html><html><head><meta charset="utf-8"><title>XP Demo App</title></head><body><div id="root"></div></body></html>`
    })
  ]
};
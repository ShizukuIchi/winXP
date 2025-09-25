const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src/index.tsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'auto',
    clean: true,
  },
  devtool: 'source-map',
  devServer: {
    port: 3004,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    },
    static: [
      {
        directory: path.resolve(__dirname, 'public'),
      },
      {
        directory: path.resolve(__dirname, '../src/assets'),
        publicPath: '/assets',
      }
    ],
    hot: true,
    liveReload: true,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
      reconnect: true,
    },
    webSocketServer: 'ws',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    alias: {
      'components': path.resolve(__dirname, '../src/components'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'types': path.resolve(__dirname, '../src/types'),
      'WinXP': path.resolve(__dirname, 'src'),
      'hooks': path.resolve(__dirname, '../src/hooks'),
      // Fix styled-components v4 depending on nested stylis path
      'styled-components/node_modules/stylis': path.resolve(__dirname, 'node_modules/stylis')
    },
    plugins: [
      new TsconfigPathsPlugin({ configFile: path.resolve(__dirname, 'tsconfig.json') })
    ]
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
      name: 'winxpHost',
      remotes: {
        notepadApp: 'notepadApp@http://localhost:3105/remoteEntry.js',
        minesweeperApp: 'minesweeperApp@http://localhost:3106/remoteEntry.js',
        xpDemoApp: 'xpDemoApp@http://localhost:3108/remoteEntry.js',
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: '^16.8.6',
          eager: true
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '^16.8.6',
          eager: true
        },
        'styled-components': {
          singleton: true,
          requiredVersion: '^4.2.0',
          eager: true
        },
        'react-use': {
          singleton: true,
          requiredVersion: '^7.0.1'
        },
        'lodash.samplesize': {
          singleton: true,
          requiredVersion: '^4.2.0',
          eager: true
        }
      }
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      title: 'Windows XP Desktop'
    })
  ]
};
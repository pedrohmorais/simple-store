const withPlugins = require('next-compose-plugins')
const withCSS = require('@zeit/next-css')
const withImages = require('next-images')
const withFonts = require('next-fonts')
const withSass = require('@zeit/next-sass')
const withTM = require('next-transpile-modules')([
  'lowdb',
])

// const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  // assetPrefix: isProd ? '/platform/assets/tours' : '',
  // publicRuntimeConfig: {},
  env: {
    NEXT_PUBLIC_API: process.env.NEXT_PUBLIC_CONTEXTAPI,
  },
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        lowdb: 'empty'
      }
    }
    config.module.rules.push(
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    );

    //node ignore modules
    config.node.fs = 'empty';
    config.node.lowdb = 'empty';

    return config
  }
}

module.exports = withPlugins(
  [withTM, withSass, withImages, withFonts, withCSS],
  nextConfig,
)
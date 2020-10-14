require("dotenv").config();
const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
const webpack = require('webpack');


module.exports = withCSS(withSass());
module.exports = {
  env: {
      MONGO_URI: "mongodb+srv://datonics:shopify2020@datonic-vb0oi.mongodb.net/test?retryWrites=true&w=majority"
  }
}

const apiKey =  JSON.stringify(process.env.SHOPIFY_API_KEY);

module.exports = withCSS({
  webpack: (config, { isServer }) => {
    const env = { API_KEY: apiKey };
    config.plugins.push(new webpack.DefinePlugin(env));
    if (!isServer) {
      config.node = {
        fs: 'empty'
      }
    }
    return config;
  },
});
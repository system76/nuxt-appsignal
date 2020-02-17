/**
 * nuxt-appsignal/src/index.js
 * Nuxt entry point for Appsignal integration
 */

const { expressMiddleware } = require('@appsignal/express')
const { Appsignal } = require('@appsignal/nodejs')
const { resolve } = require('path')

const DEFAULTS = {
  active: true,

  name: null,
  revision: null,
  uri: null,

  key: null,
  frontendKey: null
}

export default function AppsignalModule (moduleOptions) {
  const options = Object.assign({}, DEFAULTS, this.options.appsignal, moduleOptions)

  if (options.active && options.frontendKey != null) {
    this.addPlugin({
      src: resolve(__dirname, 'plugin.js'),
      fileName: 'nuxt-appsignal.js',
      ssr: false,
      options
    })
  }

  if (options.active && options.key != null) {
    const appsignal = new Appsignal({
      active: options.active,
      name: options.name,
      revision: options.revision,
      apiKey: options.key
    })

    this.nuxt.hook('render:setupMiddleware', (app) => {
      app.use(expressMiddleware(appsignal))
    })
  }
}

module.exports.meta = require('../package.json')

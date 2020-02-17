/**
 * nuxt-appsignal/src/plugin.js
 * Client side integration for appsignal
 */

import Appsignal from '@appsignal/javascript'
import { plugin as consolePlugin } from '@appsignal/plugin-breadcrumbs-console'
import { plugin as networkPlugin } from '@appsignal/plugin-breadcrumbs-network'
import { plugin as windowPlugin } from '@appsignal/plugin-window-events'
import { plugin as pathPlugin } from '@appsignal/plugin-path-decorator'
import { errorHandler } from '@appsignal/vue'
import Vue from 'vue'

const appsignal = new Appsignal({
  <% if (options.uri) { %>uri: '<%= options.uri %>',<% } %>
  <% if (options.revision) { %>revision: '<%= options.revision %>',<% } %>
  key: '<%= options.frontendKey %>'
})

appsignal.use(consolePlugin({}))
appsignal.use(networkPlugin({}))
appsignal.use(windowPlugin({}))
appsignal.use(pathPlugin({}))

Vue.config.errorHandler = errorHandler(appsignal, Vue)

export default (ctx, inject) => {
  ctx.$appsignal = appsignal
  inject('appsignal', appsignal)
}

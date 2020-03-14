import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'
import config from '../config/api.config'
import store from '../store/'

const baseUrl = config.dionysusHost
const token = Vue.ls.get('token')

console.log('token', token)

Vue.use(new VueSocketIO({
  debug: true,
  connection: baseUrl,
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  },
  options: {
    query: { token }
  }
}))

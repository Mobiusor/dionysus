import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'
import users from './modules/users'
import socket from './modules/socket'
// default router permission control
import permission from './modules/permission'

// below are business related modules
import room from './modules/room'

// dynamic router permission control (Experimental)
// import permission from './modules/async-router'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    user,
    users,
    socket,
    permission,

    // below are business related modules
    room
  },
  state: {
  },
  mutations: {
  },
  actions: {
  },
  getters
})

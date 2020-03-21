import { dionysusService } from '@/api'
import Vue from 'vue'

const users = {
  state: {
    list: {}
  },

  mutations: {
    UPDATE_USER: (state, user) => {
      Vue.set(state.list, user.id, user)
    }
  },

  actions: {
    async GetUserInfo ({ commit, state }, userId) {
      let user = state.list[userId]
      if (!user) {
        user = await dionysusService.getUserInfo(userId)
        console.log('fetched')
        commit('UPDATE_USER', user)
      }
      return user
    }
  }
}

export default users

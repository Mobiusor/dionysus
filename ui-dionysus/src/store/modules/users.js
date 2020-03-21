import { dionysusService } from '@/api'
import Vue from 'vue'

const users = {
  state: {
    list: {},
    fetching: {}
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
        if (!state.fetching[userId]) {
          state.fetching[userId] = true
          user = await dionysusService.getUserInfo(userId)
          console.log('fetched user', user.id, user.name)
          commit('UPDATE_USER', user)
        }
      }
      return user
    }
  }
}

export default users

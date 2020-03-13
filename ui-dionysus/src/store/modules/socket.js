import { dionysusService } from '@/api'

const socket = {
  state: {
    connection: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    }
  },

  actions: {
    // 获取用户信息
    async Connect () {

    }
    // 登出
  }
}

export default socket

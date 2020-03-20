import { dionysusService } from '@/api'

const socket = {
  state: {
    connection: {}
  },

  mutations: {
  },

  actions: {
    // 获取用户信息
    async 'Socket_chat/message' (data) {
      console.log('socket connect data')
    },
    async Socket_connect ({ commit }) {
      const response = await dionysusService.getProfile()
      const { name, avatar } = response
      commit('SET_NAME', name)
      commit('SET_AVATAR', avatar)
    }
    // 登出
  }
}

export default socket

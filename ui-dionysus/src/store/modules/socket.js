// import { dionysusService } from '@/api'

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
    }

    // 登出
  }
}

export default socket

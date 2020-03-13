import { removeToken } from 'minerva-ui-sdk'

import { authService } from '@/api'
import { welcome } from '@/utils/util'

const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {},
    userLoaded: false
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    },
    SET_USER_LOADED (state, status) {
      state.userLoaded = status
    }
  },

  actions: {
    // 获取用户信息
    async GetInfo ({ commit }) {
      const res = await authService.getInfo()
      const userInfo = res.data
      if (userInfo.roles) {
        commit('SET_ROLES', userInfo.roles)
        commit('SET_NAME', { name: userInfo.accountDisplayName, welcome: welcome() })
        commit('SET_INFO', userInfo)
        commit('SET_USER_LOADED', true)
        return userInfo
      } else {
        throw new Error('getInfo: roles must be a non-null array !')
      }
    },

    // 登出
    async Logout ({ commit }) {
      return new Promise((resolve) => {
        commit('SET_ROLES', {})
        removeToken()
        resolve()
      })
    }

  }
}

export default user

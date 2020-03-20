import { dionysusService } from '@/api'

const user = {
  state: {
    token: '',
    name: '',
    avatar: '',
    roles: [],
    info: {},
    userLoaded: false
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
      console.log('set token', token)
      localStorage.setItem('token', token)
    },
    REMOVE_TOKEN: (state) => {
      state.token = null
      console.log('remove token')
      localStorage.removeItem('token')
    },
    SET_NAME: (state, name) => {
      state.name = name
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
    async Login ({ commit }, { username, password }) {
      const token = await dionysusService.login(username, password)
      commit('SET_TOKEN', token)
    },

    async Register ({ commit }, { username, password, name, avatar }) {
      const token = await dionysusService.register(username, password, name, avatar)
      commit('SET_TOKEN', token)
    },

    Logout ({ commit }) {
      commit('REMOVE_TOKEN')
    }

  }
}

export default user

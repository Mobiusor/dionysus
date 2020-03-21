import { dionysusService } from '@/api'

const user = {
  state: {
    id: null,
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
      localStorage.setItem('token', token)
    },
    REMOVE_TOKEN: (state) => {
      state.token = null
      localStorage.removeItem('token')
    },
    SET_USER: (state, user) => {
      state.id = user.id
      state.name = user.name
      state.avatar = user.avatar
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
    async Socket_connect ({ commit }) {
      const user = await dionysusService.getProfile()
      commit('SET_USER', user)
    },

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

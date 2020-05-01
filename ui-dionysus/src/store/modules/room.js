import { dionysusService } from '@/api'

const room = {
  state: {
    list: [],
    current: null,
    players: []
  },

  mutations: {
    SET_ROOMS: (state, rooms) => {
      state.list = rooms
    },
    ADD_ROOM: (state, room) => {
      state.list.push(room)
    },
    DELETE_ROOM: (state, id) => {
      const index = state.list.findIndex(room => room.id === id)
      state.list.splice(index, 1)
    },
    SET_CURRENT_ROOM: (state, id) => {
      if (state.current !== id) {
        state.current = id
        state.players = []
      }
    },
    SET_PLAYERS: (state, players) => {
      state.players = players
    }
  },

  actions: {
    async GetRooms ({ commit }) {
      const rooms = await dionysusService.getRooms()
      commit('SET_ROOMS', rooms)
    },

    async CreateRoom ({ commit }, { type, name }) {
      const room = await dionysusService.createRoom(type, name)
      commit('ADD_ROOM', room)
    },

    async DeleteRoom ({ commit }, id) {
      await dionysusService.deleteRoom(id)
      commit('DELETE_ROOM', id)
    },

    async JoinRoom ({ commit }, id) {
      const result = await dionysusService.joinRoom(id)
      console.log(result)
      commit('SET_CURRENT_ROOM', id)
    },

    async LeaveRoom ({ commit }, id) {
      const result = await dionysusService.leaveRoom(id)
      console.log(result)
      commit('SET_CURRENT_ROOM', null)
    },

    async GetPlayers ({ commit }) {
      // TODO: should check room users
      const players = await dionysusService.getPlayers()
      console.log('players', players)
      commit('SET_PLAYERS', players)
    }
  }
}

export default room

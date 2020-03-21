import { dionysusService } from '@/api'

const room = {
  state: {
    list: []
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
    }
  }
}

export default room

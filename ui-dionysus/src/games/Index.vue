<template>
  <draw-something />
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import DrawSomething from './DrawSomething/Index'

export default {
  props: {
    roomId: { type: String, default: null }
  },
  components: { DrawSomething },
  data () {
    return {
      context: null,
      point: { x: 0, y: 0 }
    }
  },

  mounted () {
    this.joinRoom()
  },
  destroyed () {
    this.leaveRoom()
  },

  sockets: {
  },

  computed: {
    ...mapGetters(['players'])
  },

  methods: {
    ...mapActions(['JoinRoom', 'LeaveRoom', 'GetPlayers']),

    async joinRoom () {
      await this.JoinRoom(this.roomId)
      await this.GetPlayers()
    },

    async leaveRoom () {
      await this.LeaveRoom(this.roomId)
    }
  }

}
</script>

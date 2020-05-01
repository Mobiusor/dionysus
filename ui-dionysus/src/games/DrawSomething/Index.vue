<template>
  <div id="game-body">
    <div style="width: 300px; height: 100%;" >
      <div class="div-container" id="user-list">
        <div v-for="player in players" :key="player" style="margin-top: 8px">
          <a-avatar :src="getUserAvatar(player)" />
          <span style="margin-left: 8px">{{ getUserName(player) }}</span>
        </div>
      </div>
    </div>
    <div style="margin-left: 16px;width: 684px; height: 100%;">
      <div class="div-container" id="draw"></div>
      <div class="div-container" id="messages"></div>
    </div>
  </div>
</template>

<script>
import Canvas from './Canvas'
import Chat from './Chat'
import { mapGetters } from 'vuex'
import { mixinUser } from '@/utils/mixin'
export default {
  props: {
    roomId: { type: String, default: null }
  },
  mixins: [mixinUser],
  components: { Canvas, Chat },
  data () {
    return {}
  },

  sockets: {
  },

  computed: {
    ...mapGetters(['players'])
  },

  methods: {

  }

}
</script>

<style scoped>
#game-body {
  display: flex;
  width: 1000px;
  height: 600px;
  margin: auto;
  margin-top: calc((100vh - 600px) / 2 - 120px);
}

.div-container {
  border-radius: 8px;
  padding: 16px;
}

#user-list {
  background: lightpink;
  width: 100%;
  height: 600px;
}

#draw {
  background: lightslategray;

  width: 684px;
  height: 400px;
  margin-bottom: 16px;
}

#messages {
  background: lightsalmon;

  width: 100%;
  height: 184px;
}
</style>

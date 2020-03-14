<template>
  <div>
    <div id="messages">
      <div v-for="(message, index) in messages" :key="index">
        <span>{{ message.content }}</span>
      </div>
    </div>
    <a-input placeholder="Input message" v-model="content" style="width: 240px;" />
    <a-button type="primary" @click="onClick"> send </a-button>
  </div>
</template>

<script>
import { dionysusService } from '@/api'
export default {
  data () {
    return {
      content: '',
      messages: []
    }
  },
  sockets: {
    connect () {
      console.log('socket connected')
    },
    customEmit (data) {
      console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
    },
    'chat/message' (data) {
      console.log(data)
      this.messages.push(data)
    }
  },
  methods: {
    async onClick () {
      // $socket is socket.io-client instance
      console.log(dionysusService)
      const message = { type: 'text', content: this.content }
      try {
        const response = await dionysusService.sendMessage(message)
        console.log(response)
        this.messages.push(message)
        this.content = ''
      } catch (e) {
        this.$message.error(e.message)
      }
    }
  }
}
</script>

<style scoped>
#messages {
  height: 400px;
  width: 300px;
  border: 1px solid #ccc;
  overflow: auto;
  margin-bottom: 16px;
  border-radius: 4px;
  background: white;
}
</style>

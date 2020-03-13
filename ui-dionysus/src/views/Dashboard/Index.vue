<template>
  <div><a-button @click="onClick"> test </a-button></div>
</template>

<script>
export default {
  sockets: {
    connect () {
      console.log('socket connected')
    },
    customEmit (data) {
      console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
    },
    message (data) {
      console.log(data)
    }
  },
  methods: {
    onClick () {
      // $socket is socket.io-client instance
      this.$socket.emit('test', 'hello')
    }
  }
}
</script>

<style>

</style>

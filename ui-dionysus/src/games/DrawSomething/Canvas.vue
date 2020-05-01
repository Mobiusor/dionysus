<template>
  <div>
    {{ roomId }}
    <canvas
      id="canvas"
      width="800"
      height="400"
      ref="canvas"
      @mousedown="onMouseDown"
      @mousemove="onMouseMove"
      @mouseup="onMouseUp" />
  </div>
</template>

<script>
export default {
  props: {
    roomId: { type: String, default: null }
  },
  data () {
    return {
      context: null,
      point: { x: 0, y: 0 }
    }
  },
  sockets: {
    connect () {
    },
    'chat/message' (data) {
      console.log(data)
      this.messages.push(data)
    }
  },
  timers: {
    sync: { time: 200, autostart: true }
  },
  mounted () {
    this.setContext()
  },
  methods: {
    setContext () {
      const canvas = this.$refs.canvas
      if (canvas) {
        const context = canvas.getContext('2d')
        this.context = context
      }
    },
    onMouseDown (event) {
      this.context.fillStyle = '#ff5500'
      this.point = { x: event.offsetX, y: event.offsetY }
    },

    onMouseMove (event) {
      if (event.buttons === 1) {
        this.context.moveTo(this.point.x, this.point.y)
        this.context.lineTo(event.offsetX, event.offsetY)
        this.point = { x: event.offsetX, y: event.offsetY }
        this.context.stroke()
      }
    },

    onMouseUp (event) {
      const data = this.$refs.canvas.toDataURL('image/png')
      console.log(data)
    }
  }
}
</script>

<style scoped>
#canvas {
  background-color: white;
  width: 800px;
  height: 400px;
}
</style>

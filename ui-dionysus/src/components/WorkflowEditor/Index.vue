<template>
  <div id="container">
    <div id="inner-container">
      <svg
        id="canvas"
        @mousedown="onMouseDown"
        @mousemove="onMouseMove"
        @mouseup="onMouseUp"
        dropzone
        @dragover="allowDrop"
        @drop="onDrop">
        <defs>
          <marker
            id="arrow"
            markerWidth="4"
            markerHeight="4"
            refX="5"
            refY="2"
            orient="auto"
            markerUnits="strokeWidth">
            <path d="M0,0 L0,4 L6,2 z" fill="gray" />
          </marker>
        </defs>
        <line
          v-if="connecting.isConnecting"
          :x1="connecting.start.x"
          :y1="connecting.start.y"
          :x2="connecting.end.x"
          :y2="connecting.end.y"
          marker-end="url(#arrow)"
          class="line" />
        <line
          v-for="(edge, index) in edges"
          :key="'line_' + index"
          class="line static"
          @contextmenu.prevent="$event => onShowEdgeMenu($event,index)"
          @click.meta="onDeleteEdge(index)"
          marker-end="url(#arrow)"
          :x1="getEdgePosition(edge).x1"
          :y1="getEdgePosition(edge).y1"
          :x2="getEdgePosition(edge).x2"
          :y2="getEdgePosition(edge).y2"
        />
        <g v-for="(node, index) in nodes" :key="index" @mousedown="$event => onMouseDownNode($event, index)">
          <node
            @contextmenu.native.prevent="$event => onShowNodeMenu($event,index)"
            @click.meta="onDeleteNode(index)"
            class="node"
            :data="node"
            :config="config"
            :id="index"
            :current-id="currentId"
            @startConnection="onStartConnection"
            @endConnection="onEndConnection"
          />
        </g>
      </svg>
    </div>
    <property-bar :current-node="currentNode"/>

  </div>
</template>

<script>
import Vue from 'vue'
import Node from './Node'
import PropertyBar from './PropertyBar'
import Contextmenu from 'vue-contextmenujs'
import { mapGetters } from 'vuex'

Vue.use(Contextmenu)

export default {
  name: 'WorkflowEditor',
  components: { Node, PropertyBar },
  props: {
    nodes: { type: Array, default: () => [] },
    edges: { type: Array, default: () => [] }
  },
  data () {
    return {
      currentId: null,
      config: {
        radius: 88,
        ioRadius: 14,
        sides: 12,
        ioBase: 0.25
      },

      moving: {
        currentId: null,
        isMoving: false,
        origin: { x: 0, y: 0 },
        offset: { x: 0, y: 0 }
      },
      connecting: {
        isConnecting: false,
        startNode: { id: 0, key: '' },
        start: { x: 0, y: 0 },
        end: { x: 0, y: 0 }
      }
    }
  },
  mounted () {
    this.reload()
  },
  computed: {
    ...mapGetters(['nodesLibrary']),
    currentNode () {
      return this.currentId !== null ? this.nodes[this.currentId] : null
    }
  },
  methods: {
    reload () {
      // console.log(this.nodes, this.edges)
    },
    onMouseDownNode (event, id) {
      event.stopPropagation()
      console.log(event)
      if (event.button === 0) { // left button
        this.moving.currentId = id
        this.moving.isMoving = true
        this.moving.origin = { x: this.nodes[id].center.x, y: this.nodes[id].center.y }
        this.moving.offset = { x: event.offsetX, y: event.offsetY }
      }
    },

    onMouseDown () {
      this.currentId = null
    },

    onMouseUp (event) {
      if (this.moving.currentId !== null && this.moving.isMoving) {
        if (event.offsetX - this.moving.offset.x === 0 && event.offsetY - this.moving.offset.y === 0) {
          this.currentId = this.moving.currentId
        } else {
          this.nodes[this.moving.currentId].center.x = this.moving.origin.x + event.offsetX - this.moving.offset.x
          this.nodes[this.moving.currentId].center.y = this.moving.origin.y + event.offsetY - this.moving.offset.y
        }
        this.moving.isMoving = false
      } else if (this.connecting.isConnecting === true) {
        this.connecting = {
          isConnecting: false,
          startNode: { id: 0, key: '' },
          start: { x: 0, y: 0 },
          end: { x: 0, y: 0 }
        }
      }
    },
    onMouseMove (event) {
      if (this.moving.currentId !== null && this.moving.isMoving) {
        if (event.buttons === 0) {
          this.onMouseUp(event)
          return
        }
        this.nodes[this.moving.currentId].center.x = this.moving.origin.x + event.offsetX - this.moving.offset.x
        this.nodes[this.moving.currentId].center.y = this.moving.origin.y + event.offsetY - this.moving.offset.y
      } else if (this.connecting.isConnecting === true) {
        if (event.buttons === 0) {
          this.onMouseUp(event)
          return
        }
        this.connecting.end.x = event.offsetX
        this.connecting.end.y = event.offsetY
      }
    },

    onShowNodeMenu (event, index) {
      this.$contextmenu({
        items: [{
          label: '删除',
          onClick: () => { this.onDeleteNode(index) }
        }],
        event,
        zIndex: 3,
        minWidth: 130
      })
    },

    onDeleteNode (index) {
      this.moving = {
        currentId: null,
        isMoving: false,
        origin: { x: 0, y: 0 },
        offset: { x: 0, y: 0 }
      }
      this.$store.commit('DELETE_NODE', index)
    },

    onShowEdgeMenu (event, index) {
      this.$contextmenu({
        items: [{
          label: '删除',
          onClick: () => { this.onDeleteEdge(index) }
        }],
        event,
        zIndex: 3,
        minWidth: 130
      })
    },

    onDeleteEdge (index) {
      this.$store.commit('DELETE_EDGE', index)
    },

    getEdgePosition (edge) {
      const start = this.getPosition(edge.start.id, 'output', edge.start.key)
      const end = this.getPosition(edge.end.id, 'input', edge.end.key)
      const vector = { x: end.x - start.x, y: end.y - start.y }
      const module = Math.sqrt(vector.x * vector.x + vector.y * vector.y)
      const x1 = start.x + vector.x / module * this.config.ioRadius
      const y1 = start.y + vector.y / module * this.config.ioRadius
      const x2 = end.x - vector.x / module * this.config.ioRadius
      const y2 = end.y - vector.y / module * this.config.ioRadius
      return { x1, y1, x2, y2 }
    },

    getPosition (id, io, key) {
      const node = this.nodes[id]
      const reference = this.nodesLibrary[node.referenceId]
      const { x, y } = node.center
      let index, base
      if (io === 'input') {
        index = reference.inputs.findIndex(x => x.key === key)
        base = this.config.sides * (this.config.ioBase + 0.5)
      } else {
        index = reference.outputs.findIndex(x => x.key === key)
        base = this.config.sides * this.config.ioBase
      }
      const pointIndex = Math.floor(index / 2) - index * (index % 2) + base
      const step = Math.PI * 2 / this.config.sides
      const result = { x: this.config.radius * Math.cos(pointIndex * step) + x, y: this.config.radius * Math.sin(pointIndex * step) + y }
      return result
    },

    onStartConnection (x, y, id, key) {
      this.connecting.start = { x, y }
      this.connecting.end = { x, y }
      this.connecting.isConnecting = true
      this.connecting.startNode = { id, key }
    },

    onEndConnection (x, y, id, key) {
      if (this.connecting.isConnecting === true) {
        const edge = {
          start: { id: this.connecting.startNode.id, key: this.connecting.startNode.key },
          end: { id, key }
        }
        this.$store.commit('ADD_EDGE', edge)
      }
    },

    onDrop (event) {
      const id = event.dataTransfer.getData('node')
      const item = this.nodesLibrary[id]
      if (!item) return
      const instance = {
        type: item.type,
        isLoop: false,
        referenceId: id,
        center: { x: event.offsetX, y: event.offsetY }
      }
      this.$store.commit('ADD_NODE', instance)
    },

    allowDrop (event) {
      event.preventDefault()
    }
  }
}
</script>

<style scoped lang="less">
#container {
  width: 100%;
  margin-top: 16px;
  position: relative;
}

#inner-container {
  background-color: #fafafa;
  height: calc(100vh - 160px);
  overflow: auto;
}

#canvas {
  background-image: radial-gradient(#ddd 1px, transparent 1px);
  background-color: #fafafa;
  background-size: 20px 20px;
  width: 3200px;
  height: 1600px;
}

.line {
  stroke: gray;
  stroke-width: 3;
  &.static:hover {
    opacity: 0.6;
    cursor: pointer;
  }
}

.node {
  cursor: pointer;
}

</style>

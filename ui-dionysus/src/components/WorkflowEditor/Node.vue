<template>
  <g :class="[data.type, currentId === data.id ? 'active': 'inactive']" class="temp">
    <polygon :points="calcPoints(config.radius)" class="outline"/>
    <polygon :points="calcPoints(config.radius - 8)" class="main"/>
    <!-- <circle :cx="node.center.x + 2" :cy="node.center.y + 2" :r="config.radius - 25" class="shadow" /> -->
    <circle :cx="data.center.x" :cy="data.center.y" :r="config.radius - 28" class="circle" />
    <text :x="data.center.x" :y="data.center.y - config.radius + 72" class="center-text type">{{ data.type.toUpperCase() }}</text>
    <text :x="data.center.x" :y="data.center.y + 16" class="center-text name">{{ reference.displayName | formatName }}</text>

    <g v-for="(input, index) in reference.inputs" :key="'i_' + input.key" class="node-input" @mouseup="$event => onMouseUp($event, index, input.key)">
      <circle
        :cx="calcInputCircleCenter(index, config.radius).x"
        :cy="calcInputCircleCenter(index, config.radius).y"
        :r="config.ioRadius"
      />
      <text :x="calcInputCircleCenter(index, config.radius).x" :y="calcInputCircleCenter(index, config.radius).y + 1" class="center-text io-name">
        {{ input.key | formatIoName }}
      </text>
    </g>
    <g v-for="(output, index) in reference.outputs" :key="'o_' + output.key" class="node-output" @mousedown="$event => onMouseDown($event, index, output.key)">
      <circle :cx="calcOutputCircleCenter(index, config.radius).x" :cy="calcOutputCircleCenter(index, config.radius).y" :r="config.ioRadius" />
      <text :x="calcOutputCircleCenter(index, config.radius).x" :y="calcOutputCircleCenter(index, config.radius).y + 1" class="center-text io-name">
        {{ output.key | formatIoName }}
      </text>
    </g>
  </g>
</template>

<script>
import { mapGetters } from 'vuex'
import { truncate } from 'lodash'

export default {
  name: 'Node',
  props: {
    currentId: { type: Number, default: null },
    id: { type: Number, default: null },
    data: { type: Object, default: () => {} },
    config: { type: Object,
      default: () => ({
        radius: 88,
        ioRadius: 16,
        sides: 8,
        ioBase: 0
      }) }
  },
  computed: {
    ...mapGetters(['nodesLibrary']),
    reference () {
      return this.nodesLibrary[this.data.referenceId]
    }
  },
  data () {
    return {}
  },
  filters: {
    formatName (name) {
      return name
    },
    formatIoName (name) {
      return truncate(name, { length: 3, omission: '' })
    }
  },
  methods: {
    calcPoints (radius) {
      const step = Math.PI * 2 / this.config.sides
      const points = []
      for (let i = 0; i <= Math.PI * 2; i += step) {
        const x = radius * Math.cos(i) + this.data.center.x
        const y = radius * Math.sin(i) + this.data.center.y
        points.push({ x, y })
      }
      return points.reduce((pre, cur) => `${pre} ${cur.x}, ${cur.y}`, '')
    },

    calcInputCircleCenter (index, radius) {
      return this.calcPoint(index, this.config.sides * (this.config.ioBase + 0.5), radius)
    },

    calcOutputCircleCenter (index, radius) {
      return this.calcPoint(index, this.config.sides * this.config.ioBase, radius)
    },

    calcPoint (index, base, radius) {
      const step = Math.PI * 2 / this.config.sides
      const pointIndex = Math.floor(index / 2) - index * (index % 2) + base
      const x = radius * Math.cos(pointIndex * step) + this.data.center.x
      const y = radius * Math.sin(pointIndex * step) + this.data.center.y
      return { x, y }
    },

    onMouseDown (event, index, key) {
      event.stopPropagation()
      const { x, y } = this.calcOutputCircleCenter(index, this.config.radius)
      this.$emit('startConnection', x, y, this.id, key)
    },

    onMouseUp (event, index, key) {
      const { x, y } = this.calcInputCircleCenter(index, this.config.radius)
      this.$emit('endConnection', x, y, this.id, key)
    }
  }
}
</script>

<style scoped lang="less">
.temp {
  opacity: 1;
  &:hover {
    opacity: 0.8;
  }
  &.active {
    opacity: 0.6;
  }
}
.circle {
  fill: white;
}
.shadow {
  fill: gray;
}
.outline {
  stroke-width: 4;
  fill: white;
}
.center-text {
  user-select: none;
  dominant-baseline: middle;
  text-anchor: middle;
}

.io-name {
  font-size: 14px;
}

.type {
  font-weight: bolder;
  fill: gray;
}

.name {
  font-size: 20px;
}

.module {
  .main { fill: #00b5db; }
  .outline { stroke: #00b5db; }
  .name { fill: darken(#00b5db, 20%); }
}

.approval {
  .main { fill: #bf6bab; }
  .outline { stroke: #bf6bab; }
  .name { fill: darken(#bf6bab, 20%); }
}

.expert {
  .main { fill: #df4976; }
  .outline { stroke: #df4976; }
  .name { fill: darken(#df4976, 20%); }
}

.input {
  .main { fill: #afd140; }
  .outline { stroke: #afd140; }
  .name { fill: darken(#afd140, 20%); }
}

.api {
  .main { fill: #ffaa20; }
  .outline { stroke: #ffaa20; }
  .name { fill: darken(#ffaa20, 20%); }
}

.node-input {
  circle {
    fill: white;
    stroke: #59ba6d;
    stroke-width: 3;
  }
  text {
    fill: #59ba6d;
  }
  &:hover{
    circle {
      fill: #59ba6d;
      r: 16;
    }
    text {
      fill: white;
    }
  }
}

.node-output {
  circle {
    fill: white;
    stroke: #e2bd39;
    stroke-width: 3;
  }
  text {
    fill: #e2bd39;
  }
  &:hover{
    circle {
      fill: #e2bd39;
      r: 16;
    }
    text {
      fill: white;
    }
  }
}
</style>

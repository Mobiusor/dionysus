<template>
  <div>
    <a-divider v-if="currentReference.outputs && currentReference.outputs.length > 0" orientation="left">Outputs</a-divider>
    <div v-for="output in currentReference.outputs" :key="'output_' + output.key" class="node-io-item">

      <a-tag :color="output.type | mapTypeColor">
        <a-icon :type="output.isDirectory | mapFileIcon"/>
        {{ output.type }}
      </a-tag>
      <span style="margin-right: 8px">{{ output.key }}</span>
      <a-input
        size="small"
        style="width: 160px; "
        v-if="currentNode.outputs && currentNode.outputs[output.key]"
        :value="currentNode.outputs[output.key]"
        @change="changeAlias($event, output.key)">
        <a slot="addonAfter" size="small" @click="clearAlias(output.key)">
          <a-icon type="close" />
        </a>
      </a-input>
      <a-input
        v-else
        disabled
        size="small"
        placeholder="path"
        :value="output.defaultValue"
        style="width: 160px;">
        <a slot="addonAfter" size="small" @click="makeAlias(output.key)">
          <a-icon type="edit" />
        </a>
      </a-input>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OutputsEditor',
  props: {
    currentNode: { type: Object, default: null },
    currentReference: { type: Object, default: null }
  },
  filters: {
    mapTypeIcon (type) {
      const map = { 'file': 'file', 'image': 'image', 'pdf': 'pdf', 'json': 'json' }
      return map[type]
    },
    mapFileIcon (isDirectory) {
      return isDirectory === true ? 'folder' : 'file'
    },
    mapTypeColor (type) {
      const map = { 'file': 'purple', 'image': 'orange', 'pdf': 'red', 'json': 'blue', 'html': 'cyan', 'text': 'gray' }
      return map[type]
    }
  },

  methods: {
    makeAlias (key) {
      if (!this.currentNode.outputs) this.currentNode.outputs = {}
      const index = this.currentReference.outputs.findIndex(x => x.key === key)
      this.currentNode.outputs[key] = this.currentReference.outputs[index].defaultValue
      // TODO: move set output to store
      this.$forceUpdate()
    },

    clearAlias (key) {
      delete this.currentNode.outputs[key]
      // TODO: move set output to store
      this.$forceUpdate()
    },

    changeAlias (e, key) {
      this.currentNode.outputs[key] = e.target.value
      this.$forceUpdate()
    }
  }
}
</script>

<style scoped>
.node-io-item {
  padding: 8px;
  margin: 4px 0;
  border: 1px dashed #eee;
  border-radius: 4px;
}
</style>

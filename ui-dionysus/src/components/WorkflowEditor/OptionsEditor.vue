<template>
  <div>
    <a-divider v-if="currentReference.options && currentReference.options.length > 0" orientation="left">Options</a-divider>
    <div v-for="option in currentReference.options" :key="'options_' + option.key" class="node-io-item">
      <a-icon type="setting" style="margin-right: 8px" theme="filled"/>{{ option.key }}
      <a-input
        size="small"
        style="width: 160px; margin-left: 16px;"
        v-if="currentNode.options && currentNode.options[option.key]"
        :value="currentNode.options[option.key]"
        @change="changeAlias($event, option.key)">
        <a slot="addonAfter" size="small" @click="clearAlias(option.key)">
          <a-icon type="close" />
        </a>
      </a-input>
      <a-input
        v-else
        disabled
        size="small"
        placeholder="path"
        :value="option | mapValue"
        style="width: 160px; margin-left: 16px;">
        <a slot="addonAfter" size="small" @click="makeAlias(option.key)">
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
    mapValue (option) {
      if (option.type === 'string') return option.defaultValue
      else if (option.type === 'boolean') return `${option.defaultValue}`
      else if (option.type === 'number') return `${option.defaultValue}`
    }
  },

  methods: {
    makeAlias (key) {
      if (!this.currentNode.options) this.currentNode.options = {}
      const index = this.currentReference.options.findIndex(x => x.key === key)
      const value = `${this.currentReference.options[index].defaultValue}`
      this.currentNode.options[key] = value
      // TODO: move set output to store
      this.$forceUpdate()
    },

    clearAlias (key) {
      delete this.currentNode.options[key]
      // TODO: move set output to store
      this.$forceUpdate()
    },

    changeAlias (e, key) {
      this.currentNode.options[key] = e.target.value
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

<template>
  <div>
    <a-divider orientation="left">
      <span>Inputs </span>
      <a-button
        v-if="currentNode.type === 'api'"
        disabled
        style="margin-left: 8px"
        icon="plus"
        shape="circle"
        size="small"/>
    </a-divider>
    <div v-for="input in currentReference.inputs" :key="'input_' + input.key" class="node-io-item">
      <a-tag :color="input.type | mapTypeColor">
        <a-icon :type="input.isDirectory | mapFileIcon"/>
        {{ input.type }}
      </a-tag>
      {{ input.key }}
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
    mapFileIcon (isDirectory) {
      return isDirectory === true ? 'folder' : 'file'
    },
    mapTypeColor (type) {
      const map = { 'file': 'purple', 'image': 'orange', 'pdf': 'red', 'json': 'blue', 'html': 'cyan', 'text': 'gray' }
      return map[type]
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

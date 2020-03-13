<template>
  <div ref="toolbar" class="bar-group" :class="{ left: align === 'left', right: align === 'right' }">
    <slot></slot>
  </div>
</template>

<script>
import { attachElement, detachElement } from '@/utils/domUtil'

export default {
  props: {
    align: { type: String, default: () => 'left' }
  },
  mounted () {
    attachElement(this.$refs.toolbar, 'toolbar')
  },
  beforeDestroy () {
    detachElement(this.$refs.toolbar)
  }
}
</script>

<style scoped>
.bar-group {
  display: inline-block;
  margin-right: 8px;
  margin-left: 8px;
}

</style>

<template>
  <a-card id="status-bar" v-if="currentNode">
    <div slot="title">
      <span style="font-size: 18px; font-weight: 600;">{{ currentReference.displayName }}</span>
    </div>
    <div slot="extra">
      <a-tag color="blue">{{ currentNode.type }}</a-tag>
    </div>
    <div style="margin-bottom: 16px;">
      <span style="margin-right: 16px;">{{ currentReference.name }}</span>
      <span style="color: #aaa;">{{ currentReference.description }}</span>
    </div>
    <a-row>
      <description-list size="small" v-if="currentNode.type === 'module'">
        <description-list-item term="version"><a-tag>{{ currentReference.version }}</a-tag></description-list-item>
        <description-list-item term="checkpoint"><a-tag>{{ currentReference.checkpoint }}</a-tag></description-list-item>
      </description-list>
      <a-switch v-if="currentNode.type === 'module'" @change="onChangeLoop" :checked="currentNode.isLoop" checkedChildren="循环调用" unCheckedChildren="单次调用" />
    </a-row>

    <options-editor :currentNode="currentNode" :currentReference="currentReference"/>
    <inputs-editor :currentNode="currentNode" :currentReference="currentReference"/>
    <outputs-editor :currentNode="currentNode" :currentReference="currentReference"/>

  </a-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { DescriptionList } from '@/components/'
import OutputsEditor from './OutputsEditor'
import InputsEditor from './InputsEditor'
import OptionsEditor from './OptionsEditor'

const DescriptionListItem = DescriptionList.Item

export default {
  name: 'PropertyBar',
  components: { DescriptionList, DescriptionListItem, InputsEditor, OutputsEditor, OptionsEditor },
  props: {
    currentNode: { type: Object, default: null }
  },
  methods: {
    onChangeLoop (value) {
      this.currentNode.isLoop = value
    }
  },
  filters: {
    mapTypeIcon (type) {
      return type === 'file' ? 'file' : 'folder'
    }
  },
  computed: {
    ...mapGetters(['nodesLibrary']),
    currentReference () {
      if (this.currentNode) {
        return this.nodesLibrary[this.currentNode.referenceId]
      }
      return null
    }
  }
}
</script>

<style scoped lang="less">
#status-bar {
  background: white;
  border: 2px dashed #ccc;
  border-radius: 4px;
  width: 400px;
  max-height: 600px;
  overflow: auto;
  position: absolute;
  top: 16px;
  right: 32px;

  &::-webkit-scrollbar {
    display: none;
  }
}

</style>

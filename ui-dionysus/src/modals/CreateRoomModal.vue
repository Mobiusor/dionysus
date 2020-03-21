<template>
  <a-modal
    :mask-closable="false"
    v-model="visible"
    title="创建新房间"
    okText="创建"
    @ok="handleSubmit"
    :confirmLoading="loading">
    <a-form layout="vertical" :form="form" options.initialValue="">
      <a-form-item label="房间名称">
        <a-input
          type="text"
          placeholder="输入房间名"
          v-decorator="[ 'name', { rules: [{ required: true, message: '输入房间名' }] } ]">
        </a-input>
      </a-form-item>

      <a-form-item label="选择游戏">
        <a-select
          placeholder="选择游戏"
          v-decorator="[ 'type', { rules: [{ required: true, message: '请选择一个游戏' }], initialValue: 'draw' } ]">
          <a-select-option v-for="game in games" :key="game.type" :value="game.type">{{ game.name }}</a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    value: Boolean
  },

  beforeCreate () {
    this.form = this.$form.createForm(this)
  },

  data () {
    return {
      visible: false,
      loading: false,
      games: [{ type: 'draw', name: '你画我猜' }]
    }
  },

  watch: {
    visible () {
      this.$emit('input', this.visible)
    },
    value () {
      this.visible = this.$props.value
    }
  },

  methods: {
    ...mapActions(['CreateRoom']),
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.create(values)
        }
      })
    },

    async create (values) {
      this.loading = true
      try {
        await this.CreateRoom(values)
        this.$message.success('创建房间成功')
        this.visible = false
      } catch (err) {
        this.$message.error(err.message)
        console.error(err)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <a-modal :mask-closable="false" v-model="visible" :title="null" :footer="null">
    <a-tabs size="large" class="tab" :tabBarStyle="{textAlign: 'center',marginBottom:'8px'}" >
      <a-tab-pane tab="登录" key="1" >
        <login-form />
      </a-tab-pane>
      <a-tab-pane tab="注册" key="2" >
        <register-form />
      </a-tab-pane>
    </a-tabs>
  </a-modal>
</template>

<script>
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

export default {
  props: {
    value: Boolean
  },

  components: { LoginForm, RegisterForm },

  data () {
    return {
      visible: false
    }
  },

  watch: {
    visible () {
      this.$emit('input', this.visible)
    },
    value () {
      this.visible = this.$props.value
    }
  }
}
</script>

<style scoped>

</style>

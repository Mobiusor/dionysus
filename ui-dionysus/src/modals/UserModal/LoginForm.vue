<template>
  <a-form class="user-layout-login" :form="form">
    <a-form-item>
      <a-input
        size="large"
        type="text"
        placeholder="用户名"
        v-decorator="[ 'username', { rules: [{ required: true, message: '输用户名咋' }] } ]">
        <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
      </a-input>
    </a-form-item>

    <a-form-item >
      <a-input
        size="large"
        type="password"
        autocomplete="false"
        placeholder="密码"
        v-decorator="[ 'password', { rules: [{ required: true, message: '输密码咋' }] } ]">
        <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
      </a-input>
    </a-form-item>

    <a-form-item style="margin-top:24px">
      <a-button
        size="large"
        type="primary"
        htmlType="submit"
        class="login-button"
        :loading="loginBtn"
        @click.stop.prevent="handleSubmit"
        :disabled="loginBtn"
      >登录</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import md5 from 'md5'
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
      loginBtn: false
    }
  },

  methods: {
    ...mapActions(['Login']),
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          values.password = md5(values.password)
          this.login(values)
        }
      })
    },

    async login (values) {
      this.loginBtn = true
      try {
        await this.Login(values)
        this.$message.success('登录成功')
        window.location.reload()
      } catch (err) {
        this.$message.error(err.message)
        console.error(err)
      } finally {
        this.loginBtn = false
      }
    }
  }
}
</script>

<style scoped>
.user-layout-login {
  margin-top: 24px;
}
.user-layout-login label {
  font-size: 14px;
}
.user-layout-login button.login-button {
  padding: 0 15px;
  font-size: 16px;
  height: 40px;
  width: 100%;
}
.user-layout-login .user-login-other {
  text-align: left;
  margin-top: 24px;
  line-height: 22px;
}
.user-layout-login .user-login-other .register {
  float: right;
}
</style>

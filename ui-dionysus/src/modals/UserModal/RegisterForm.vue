<template>
  <a-form class="user-layout-register" :form="form">
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

    <a-form-item>
      <a-input
        size="large"
        type="text"
        placeholder="昵称"
        v-decorator="[ 'name', { rules: [{ required: true, message: '给自己起个好听的名字' }] } ]">
        <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
      </a-input>
    </a-form-item>

    <a-form-item style="margin-top:24px">
      <a-button
        size="large"
        type="primary"
        htmlType="submit"
        class="register-button"
        :loading="registerBtn"
        @click.stop.prevent="handleSubmit"
        :disabled="registerBtn"
      >注册</a-button>
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
      registerBtn: false
    }
  },

  methods: {
    ...mapActions(['Register']),
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          values.password = md5(values.password)
          this.register(values)
        }
      })
    },

    async register (values) {
      this.registerBtn = true
      try {
        const avatar = 'default'
        await this.Register({ username: values.username, password: values.password, name: values.name, avatar })
        window.location.reload()
      } catch (err) {
        this.$message.error(err.message)
        console.error(err)
      } finally {
        this.registerBtn = false
      }
    },

    loginSuccess () {
      // this.loginBtn = false
      // const temp = getAllUrlParams()
      // if (temp.redirect) {
      //   const redirect = unescape(temp.redirect)
      //   console.log(redirect)
      //   window.location.href = redirect
      // } else {
      //   this.$router.push({ path: '/' })
      // }

    }
  }
}
</script>

<style scoped>
.user-layout-register {
  margin-top: 24px;
}
.user-layout-register label {
  font-size: 14px;
}
.user-layout-register button.register-button {
  padding: 0 15px;
  font-size: 16px;
  height: 40px;
  width: 100%;
}
.user-layout-register .user-register-other {
  text-align: left;
  margin-top: 24px;
  line-height: 22px;
}
.user-layout-register .user-register-other .register {
  float: right;
}
</style>

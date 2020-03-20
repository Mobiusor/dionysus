<template>
  <div class="user-wrapper">
    <div class="content-box">
      <!-- <a href="https://pro.loacg.com/docs/getting-started" target="_blank">
        <span class="action">
          <a-icon type="question-circle-o"></a-icon>
        </span>
      </a> -->
      <!-- <notice-icon class="action"/> -->
      <a-dropdown>
        <span class="action ant-dropdown-link user-dropdown-menu">
          <div v-if="nickname" >
            <a-avatar class="avatar" style="background-color:#ccc; top: -2px;" size="small" :src="avatar"/>
            <span>{{ nickname }}</span>
          </div>
          <div v-else >
            <a-avatar class="avatar" style="background-color:#ccc; top: -2px;" size="small" icon="user"/>
            <span>未登录</span>
          </div>
        </span>
        <a-menu slot="overlay" class="user-dropdown-menu-wrapper">
          <a-menu-item key="2" v-if="nickname">
            <a @click="onLogout">
              <a-icon type="logout"/>
              <span>退出登录</span>
            </a>
          </a-menu-item>
          <a-menu-item key="1" v-else>
            <a @click="onLogin">
              <a-icon type="logout"/>
              <span>登录</span>
            </a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
    <user-modal v-model="visible"></user-modal>
  </div>
</template>

<script>
import NoticeIcon from '@/components/NoticeIcon'
import UserModal from '@/components/tools/UserModal/Index'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'UserMenu',
  components: { NoticeIcon, UserModal },

  data () {
    return { visible: false }
  },

  computed: {
    ...mapGetters(['nickname', 'avatar'])
  },

  methods: {
    ...mapActions(['Logout']),
    onLogin () {
      this.visible = true
      console.log(this.nickname)
    },
    onLogout () {
      this.$confirm({
        title: '提示',
        content: '真的要注销登录吗 ?',
        onOk: () => {
          return this.Logout({}).then(() => {
            setTimeout(() => {
              window.location.reload()
            }, 16)
          }).catch(err => {
            this.$message.error({
              title: '错误',
              description: err.message
            })
          })
        },
        onCancel () {
        }
      })
    }
  }
}
</script>

<style scoped>
.avatar {
  background: red;
}
</style>

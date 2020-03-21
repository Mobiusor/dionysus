<template>
  <div>
    <a-button icon="plus" @click="onClickCreat" style="margin-bottom: 16px">创建房间</a-button>
    <a-row :gutter="16">
      <a-col
        :xs="24"
        :sm="12"
        :md="12"
        :lg="8"
        :xl="6"
        :xxl="4"
        v-for="room in rooms"
        style="margin-bottom: 16px;"
        :key="room.id">
        <a-card style="cursor: pointer" >
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            slot="cover"
          />
          <a-card-meta :title="room.name">
            <template slot="description">
              创建者 - {{ getUserName(room.creator) }}
            </template>
            <a-avatar
              slot="avatar"
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            />
          </a-card-meta>

          <template slot="actions">
            <a><a-icon style="margin-right: 8px" type="login"/>进入</a>
          </template>
          <template slot="actions">
            <a style="color:#f50" v-if="room.creator === userId"><a-icon style="margin-right: 8px" type="delete"/>删除</a>
          </template>
        </a-card>
      </a-col>
    </a-row>

    <create-room-modal v-model="visible"/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import CreateRoomModal from '@/modals/CreateRoomModal'

export default {
  components: { CreateRoomModal },
  data () {
    return {
      visible: false
    }
  },
  filters: {
    mapGameType (type) {
      const mapping = { 'draw': '你画我猜' }
      return mapping[type]
    }
  },

  created () {
    this.reload()
  },

  computed: {
    ...mapGetters(['rooms', 'userId', 'users'])

  },
  methods: {
    ...mapActions(['GetRooms', 'GetUserInfo']),

    async reload () {
      await this.GetRooms()
      const set = new Set()
      this.rooms.forEach(room => set.add(room.creator))
      const array = Array.from(set)
      const tasks = array.map(id => this.GetUserInfo(id))
      await Promise.all(tasks)
    },

    getUserName (id) {
      if (this.users[id] !== undefined) {
        return this.users[id].name
      } else return id
    },

    onClickCreat () {
      this.visible = true
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <div>
    <a-button icon="plus" @click="onClickCreate" style="margin-bottom: 16px">创建房间</a-button>
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
        <a-card style="cursor: pointer" @click.native="onEnterRoom(room.id)" >
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            slot="cover"
          />
          <a-card-meta>
            <template slot="title">
              {{ room.name }}
            </template>
            <template slot="description">
              <div>房间号 - {{ room.id }}</div>
              <div>创建者 - {{ getUserName(room.creator) }}</div>
            </template>
            <a-avatar
              slot="avatar"
              :src="getUserAvatar(room.creator)"
            />
          </a-card-meta>

          <template slot="actions">
            <a @click="onEnterRoom(room.id)"><a-icon style="margin-right: 8px" type="login"/>进入</a>
          </template>
          <template slot="actions">
            <a @click="onDelete(room.id)" style="color:#f50" v-if="room.creator === userId"><a-icon style="margin-right: 8px" type="delete"/>删除</a>
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
import { mixinUser } from '@/utils/mixin'

export default {
  components: { CreateRoomModal },
  mixins: [mixinUser],
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
    ...mapGetters(['rooms', 'userId'])
  },

  methods: {
    ...mapActions(['GetRooms', 'DeleteRoom']),

    async reload () {
      await this.GetRooms()
    },

    onClickCreate () {
      this.visible = true
    },

    onEnterRoom (id) {
      this.$router.push(`/room/${id}`)
    },

    async onDelete (id) {
      await this.DeleteRoom(id)
      this.$message.success('删除成功')
    }
  }
}
</script>

<style scoped>

</style>

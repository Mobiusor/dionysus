const mixinUser = {
  methods: {
    getUser (id) {
      this.GetUserInfo(id)
      return this.users[id]
    },

    getUserName (id) {
      const user = this.getUser(id)
      return user ? user.name : null
    },

    getUserAvatar (id) {
      const user = this.getUser(id)
      return user ? user.avatar : null
    }
  }
}

export { mixinUser }

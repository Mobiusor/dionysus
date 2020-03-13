import _ from 'lodash'

const mixinBot = {
  computed: {
    botId () {
      return this.$route.params.botId
    },
    botIndex () {
      const index = _.findIndex(this.$store.state.bot.items, item => item.id === this.botId)
      return index
    },
    bot () {
      const bot = this.$store.state.bot.items[this.botIndex]
      return bot
    }
  }
}

export { mixinBot }

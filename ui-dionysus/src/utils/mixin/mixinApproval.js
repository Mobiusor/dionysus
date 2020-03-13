import _ from 'lodash'

const mixinApproval = {
  computed: {
    approvalId () {
      return this.$route.params.approvalId
    },
    approvalIndex () {
      const index = _.findIndex(this.$store.state.approval.items, item => item.id === this.approvalId)
      return index
    },
    approval () {
      const approval = this.$store.state.approval.items[this.approvalIndex]
      return approval
    }
  }
}

export { mixinApproval }

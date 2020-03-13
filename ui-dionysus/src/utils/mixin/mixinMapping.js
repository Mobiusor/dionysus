const statusMap = { active: '已启用', inactive: '已停用', paused: '已暂停' }
const colorMap = { active: 'green', inactive: 'red', paused: 'yellow' }
const serviceIconMap = { qa: 'robot', owlly: 'robot' }
const serviceNameMap = { qa: '问答机器人', owlly: '讲解机器人' }
const channelMap = { wechat: '微信', mobile: 'App', web: '网页', wechatPublicAccount: '微信公众号', guideScreen: '讲解大屏幕' }
const skillMap = { faq: '问答', rule: '规则', noAnswer: '默认', greeting: '打招呼', guide: '讲解', skip: '静默' }

const mixinMapping = {
  methods: {
    mapStatusText (status) {
      return statusMap[status]
    },
    mapStatusColor (status) {
      return colorMap[status]
    },
    mapServiceIcon (service) {
      return serviceIconMap[service]
    },
    mapServiceName (service) {
      return serviceNameMap[service]
    },
    mapChannelName (channel) {
      return channelMap[channel]
    },
    mapSkillName (skill) {
      return skillMap[skill]
    }
  }
}

export { mixinMapping }

import appConfig from '@/config/app.config'
import { defaultRouterName } from '@/config/router.config'

const getters = {
  serviceName: () => appConfig.serviceName,
  tenant: () => appConfig.tenant,
  appName: () => appConfig.appName,
  footerText: () => appConfig.footerText,

  device: state => state.app.device,
  theme: state => state.app.theme,
  color: state => state.app.color,
  multiTab: state => state.app.multiTab,
  defaultRouterName: () => defaultRouterName,

  token: state => state.user.token,
  avatar: state => state.user.avatar,
  nickname: state => state.user.name,
  welcome: state => state.user.welcome,
  roles: state => state.user.roles,
  userInfo: state => state.user.info,
  userLoaded: state => state.user.userLoaded,

  addRouters: state => state.permission.addRouters,
  lang: state => state.i18n.lang

}

export default getters

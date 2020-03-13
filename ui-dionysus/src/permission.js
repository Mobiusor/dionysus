import NProgress from 'nprogress' // progress bar
import '@/components/NProgress/nprogress.less' // progress bar custom style
import notification from 'ant-design-vue/es/notification'
import { getToken, redirectToLogin } from 'minerva-ui-sdk'

import { setDocumentTitle, domTitle } from '@/utils/domUtil'
// import { ACCESS_TOKEN } from '@/store/mutation-types'

import router from './router'
import store from './store'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = [] // no redirect whitelist

const checkAuth = async (to, from, next) => {
  NProgress.start() // start progress bar
  to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${to.meta.title} - ${domTitle}`))
  const token = getToken()
  if (token) {
    /* has token */
    NProgress.done()
    if (store.getters.userLoaded === false) {
      try {
        const res = await store.dispatch('GetInfo')
        const { roles, isSuperTenant } = res.roles

        // 根据roles权限生成可访问的路由表
        await store.dispatch('GenerateRoutes', { roles, isSuperTenant })

        // 动态添加可访问路由表
        router.addRoutes(store.getters.addRouters)

        const redirect = decodeURIComponent(from.query.redirect || to.path)
        if (to.path === redirect) {
          // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          next({ ...to, replace: true })
        } else {
          // 跳转到目的路由
          next({ path: redirect })
        }
      } catch (error) {
        console.error(error)
        notification.error({
          message: '错误',
          description: '请求用户信息失败，请重试'
        })
        // store.dispatch('Logout').then(() => {
        //   next({ path: '/user/login', query: { redirect: to.fullPath } })
        // })
      }
    } else {
      next()
    }
  } else {
    if (whiteList.includes(to.name)) {
      // 在免登录白名单，直接进入
      next()
    } else {
      redirectToLogin()
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
}

const noAuth = async (to, from, next) => {
  if (store.getters.userLoaded === false) {
    try {
      // const res = await store.dispatch('GetInfo')
      // const { roles, isSuperTenant } = res.roles
      const roles = []
      const isSuperTenant = true
      store.commit('SET_USER_LOADED', true)
      // 根据roles权限生成可访问的路由表
      await store.dispatch('GenerateRoutes', { roles, isSuperTenant })

      // 动态添加可访问路由表
      router.addRoutes(store.getters.addRouters)

      const redirect = decodeURIComponent(from.query.redirect || to.path)
      if (to.path === redirect) {
        // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
        next({ ...to, replace: true })
      } else {
        // 跳转到目的路由
        next({ path: redirect })
      }
    } catch (error) {
      console.error(error)
      notification.error({
        message: '错误',
        description: '请求用户信息失败，请重试'
      })
      // store.dispatch('Logout').then(() => {
      //   next({ path: '/user/login', query: { redirect: to.fullPath } })
      // })
    }
  } else {
    next()
  }
}

const needAuth = process.env.VUE_APP_NEED_AUTH === 'true'

router.beforeEach(!needAuth ? noAuth : checkAuth)

router.afterEach(() => {
  NProgress.done() // finish progress bar
})

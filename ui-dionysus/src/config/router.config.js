// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/layouts'
// import { bxAnaalyse } from '@/core/icons'

export const asyncRouterMap = [

  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/room',
    children: [{
      path: '/room',
      name: 'room',
      component: () => import('@/views/Room/Index'),
      meta: { title: '房间列表', icon: 'home' }
    },
    {
      path: '/room/:roomId',
      name: 'gameRoom',
      props: true,
      component: () => import('@/games/Index'),
      meta: { title: '房间', icon: 'edit' },
      hidden: true
    }]
  },

  {
    path: '*', redirect: '/404', hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/test',
    component: BlankLayout,
    redirect: '/test/home',
    children: [
      {
        path: 'home',
        name: 'TestHome',
        component: () => import('@/views/Home')
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }

]

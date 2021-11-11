import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/login',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'のってたのしい列車販売・管理システム', icon: 'dashboard' }
    }]
  },
  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: '旅行商品',
      icon: 'nested'
    },
    children: [
      {
        path: 'Nested-1',
        component: () => import('@/views/nested/menu2/index'),
        name: 'Nested-1',
        meta: { title: '旅行商品の一覧' }
      },
      {
        path: 'Nested-2',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Nested-2',
        meta: { title: 'メニュー' },
        children: [
          {
            path: 'Nested-2-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Nested-2-1',
            meta: { title: '座席' },
            children: [
              {
                path: 'Nested-2-1-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Nested-2-1-1',
                meta: { title: 'ボックス席・相席' }
              },
              {
                path: 'Nested-2-1-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Nested-2-1-2',
                meta: { title: '空席・予約済' }
              },
              {
                path: 'Nested-2-1-3',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Nested-2-1-3',
                meta: { title: '申込人数' }
              }
            ]
          },
          {
            path: 'Nested-2-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: '集計' },
            children: [
              {
                path: 'Nested-2-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'メニュー集計' }
              },
              {
                path: 'Nested-2-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: '売上集計' }
              }
            ]
          }
        ]
      },
      {
        path: 'Nested-3',
        component: () => import('@/views/nested/menu2/index'),
        name: 'Nested-3',
        meta: { title: '運行カレンダー' }
      }

    ]
  },
  {
    path: '/nested1',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested1',
    meta: {
      title: '連行管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'nested1-1',
        component: () => import('@/views/nested/menu2/index'),
        name: 'Menu2',
        meta: { title: '旅行商品の一覧' }
      },
      {
        path: 'nested1-2',
        component: () => import('@/views/nested/menu2/index'),
        name: 'Menu2',
        meta: { title: 'シートマップ' }
      },
      {
        path: 'nested1-3',
        component: () => import('@/views/nested/menu2/index'),
        name: 'Menu2',
        meta: { title: '行程表' }
      },
      {
        path: 'nested1-4',
        component: () => import('@/views/nested/menu2/index'),
        name: 'Menu2',
        meta: { title: '予約リスト' }
      },
      {
        path: 'nested1-5',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: '公開申請' },
        children: [
          {
            path: 'nested1-5-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: '集計' },
            children: [
              {
                path: 'nested1-5-1-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'メニュー集計' }
              },
              {
                path: 'nested1-5-1-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: '売上集計' }
              }
            ]
          },
          {
            path: 'nested1-5-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'ヤオプション' },
            children: [
              {
                path: 'nested1-5-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'メニュー' }
              },
              {
                path: 'nested1-5-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: '予約対象・予約外' }
              },
              {
                path: 'nested1-5-2-3',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: '空席・予約済' }
              },
              {
                path: 'nested1-5-2-4',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: '申込人数' }
              },
              {
                path: 'nested1-5-2-5',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: '運行中止' }
              },
              {
                path: 'nested1-5-2-6',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'メール配信' }
              },
              {
                path: 'nested1-5-2-7',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'キャンセル処理' }
              }
            ]
          }
        ]
      }

    ]
  },
  {
    path: '/nested2',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested2',
    meta: {
      title: '初期設定',
      icon: 'nested'
    },
    children: [
      {
        path: 'nested2-1',
        component: () => import('@/views/nested/menu2/index'),
        name: 'Menu2',
        meta: { title: 'メニュー' }
      },
      {
        path: 'nested2-2',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: '座席' },
        children: [
          {
            path: 'nested2-2-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: '予約対象・予約外' }
          },
          {
            path: 'nested2-2-2',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'ボックス席・相席' }
          },
          {
            path: 'nested2-2-3',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: '空席・予約済' }
          },
          {
            path: 'nested2-2-4',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: '申込人数' }
          },
        ]
      }

    ]
  },
  {
    path: '/nested3',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested3',
    meta: {
      title: 'ユーザ管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'nested3-1',
        component: () => import('@/views/nested/menu2/index'),
        name: 'Menu2',
        meta: { title: 'ユーザの一覧' }
      }
    ]
  },
  {
    path: '/nested4',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested4',
    meta: {
      title: 'ンシステム管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'nested4-1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: '列車設定' },
        children: [
          {
            path: 'nested4-1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: '経路リスト' }
          }
        ]
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

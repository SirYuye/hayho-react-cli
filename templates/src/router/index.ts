/**
 * @description 路由文件  exact -- 严格匹配，location 是否和 path 完全对应上
 */

export default [
  {
    path: '/',
    component: '@/layouts/index',
    routes: [
      { path: '/', component: '@/pages/Index', title: '首页', keepAlive: true, },
      { path: '/login', component: '@/pages/login' },
      { path: '/fList1', component: '@/pages/test/fList1' },
      { path: '/fList2', component: '@/pages/fList2' },
      {
        path: '/user',
        component: '@/pages/user',
        KeepAlive: true,
        wrappers: ['@/wrappers/auth.tsx'],
      },
      { component: '@/pages/404' },
      // 重定向
      { path: '/*', redirect: '/' },
    ],
  },
];

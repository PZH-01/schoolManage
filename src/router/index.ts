import {
  createRouter, createWebHashHistory, RouteRecordRaw,
} from 'vue-router';
import Login from '../views/Login.vue';
import IsUndefined from '../views/Public/404.vue';

/**
 * router role rule
 * role include ['admin','teacher','student']
 *
 * meta: {
    title: '标题',
    icon: '图标',
    role: ['角色'],
    hidden: true
  },
 */

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    component: Login,
  },
  {
    path: '/404',
    name: '404',
    component: IsUndefined,
  },
  {
    path: '/Teacher',
    name: 'case',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Teacher" */ '../views/Teacher/index.vue'),
    children: [
      {
        path: '/Teacher/userlist',
        name: 'Teacher/userlist',
        component: () => import(/* webpackChunkName: "userlist_index" */ '../views/Teacher/userlist/index.vue'),
        meta: {
          title: '用户管理',
          icon: '',
          role: ['admin', 'teacher'],
        },
      },
      {
        path: '/Teacher/classlist',
        name: 'Teacher/classlist',
        component: () => import(/* webpackChunkName: "userlist_index" */ '../views/Teacher/classManage/index.vue'),
        meta: {
          title: '班级管理',
          icon: '',
          role: ['admin', 'teacher'],
        },
      },
      {
        path: '/Teacher/stydyManage',
        name: 'Teacher/StydyManage',
        component: () => import('../views/Teacher/stydyManage/index.vue'),
        meta: {
          title: '学习管理',
          icon: '',
          role: ['admin', 'teacher'],
        },
      },
      {
        path: '/Teacher/performanceManagement',
        name: 'Teacher/PerformanceManagement',
        component: () => import('../views/Teacher/performanceManagement/index.vue'),
        meta: {
          title: '成绩管理',
          icon: '',
          role: ['admin', 'teacher'],
        },
      },
      {
        path: '/Teacher/statisticsCenter',
        name: 'Teacher/StatisticsCenter',
        component: () => import('../views/Teacher/statisticsCenter/index.vue'),
        meta: {
          title: '统计中心',
          icon: '',
          role: ['admin', 'teacher'],
        },
      },
      {
        path: '/Teacher/logManagement',
        name: 'Teacher/LogManagement',
        component: () => import('../views/Teacher/logManagement/index.vue'),
        meta: {
          title: '日志管理',
          icon: '',
          role: ['admin', 'teacher'],
        },
      },
      {
        path: '/Teacher/exhibition',
        name: 'Teacher/Exhibition',
        component: () => import('../views/Public/Exhibition/index.vue'),
        meta: {
          title: '组件展示',
          icon: '',
          role: ['admin', 'teacher', 'student'],
        },
      },
    ],
  },
  {
    path: '/Student',
    name: 'student',
    component: () => import(/* webpackChunkName: "Student" */ '../views/Student/index.vue'),
    children: [
      {
        path: '/Student/home',
        name: 'student/home',
        component: () => import(/* webpackChunkName: "home" */ '../views/Student/index.vue'),
        meta: {
          title: '首页',
          icon: '',
          role: ['student'],
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory('/dcaw'),
  routes,
});

const whiteList = ['/', '/404']; // 路由白名单：不需要登录也可以进入
router.beforeEach((to, from, next) => {
  const { role, code } = sessionStorage;
  if (whiteList.includes(to.path)) {
    next(); // 判断白名单
  } else if (!role || !code) {
    next({ path: '/' }); // 判断登录
  } else if (to.meta.role && (to.meta.role as []).includes((role as never))) {
    next(); // 判断页面、角色权限
  } else {
    next({ path: '/404' });
  }
});

export default router;

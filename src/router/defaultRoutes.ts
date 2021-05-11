import { UserRole } from '@/types/user';

const routes = {
  admin: [
    {
      name: '用户管理',
      path: '/Teacher/userlist',
    },
    {
      name: '班级管理',
      path: '/Teacher/classlist',
    },
    {
      name: '学习管理',
      path: '/Teacher/stydyManage',
    },
    {
      name: '成绩管理',
      path: '/Teacher/performanceManagement',
    },
    {
      name: '统计中心',
      path: '/Teacher/statisticsCenter',
    },
    {
      name: '日志管理',
      path: '/Teacher/logManagement',
    },
  ],
  teacher: [
    {
      name: '用户管理',
      path: '/Teacher/userlist',
    },
    {
      name: '班级管理',
      path: '/Teacher/classlist',
    },
    {
      name: '学习管理',
      path: '/Teacher/stydyManage',
    },
    {
      name: '成绩管理',
      path: '/Teacher/performanceManagement',
    },
    {
      name: '统计中心',
      path: '/Teacher/statisticsCenter',
    },
    {
      name: '日志管理',
      path: '/Teacher/logManagement',
    },
  ],
  student: [
    {
      name: '组件展示',
      path: '/Teacher/exhibition',
    },
  ],
};

const getDefaultRoutes = (role: UserRole | null) => {
  if (role === null) return [];
  return routes[role] === undefined ? [] : routes[role];
};

export default getDefaultRoutes;

import Mock from 'mockjs';
import {
  getByCode,
  login,
  getStudentList,
  delteStudent,
  getConfig,
  getUserList,
  resetPassword,
  delteTeacher,
  changeUserName,
  createUser,
} from './modules/user';
import {
  getClassList, editClass, delClass, insertStudent,
} from './modules/classe';
import { changeUserSignatures, changePasswords } from './modules/public/userInfo';
import { getLearnRecordsTotal } from './modules/stydyManage/Header';
import {
  adminSort,
  teacherSort,
  getSearchRecordsList,
  delrecord,
  delrecordList,
} from './modules/stydyManage/Lists';
import { getLogList, getUserLists } from './modules/logManage/logManages';
import { getteacherList, getClassGradesList } from './modules/performanceManagement/Grades';

import { studyColorList } from './modules/statistics/study';

import MockPath from './mock_api';

const mockPath = new MockPath();

Mock.setup({
  timeout: '10-1500',
});
// 登录模块
Mock.mock(mockPath.login, 'post', login);
Mock.mock(mockPath.getByCode, 'post', getByCode);
Mock.mock(mockPath.softConfig, 'get', getConfig);

// 班级模块
Mock.mock(mockPath.getClassList, 'post', getClassList);
Mock.mock(mockPath.editClass, 'post', editClass);
Mock.mock(mockPath.delClass, 'post', delClass);
Mock.mock(mockPath.insertStudent, 'post', insertStudent);

// 教师列表
Mock.mock(mockPath.getUserList, 'post', getUserList);
// 学生列表
Mock.mock(mockPath.getStudentList, 'post', getStudentList);
// 重置密码
Mock.mock(mockPath.resetPassword, 'post', resetPassword);
// 删除教师
Mock.mock(mockPath.delteTeacher, 'post', delteTeacher);
// 删除学生
Mock.mock(mockPath.delteStudent, 'post', delteStudent);
// 编辑用户姓名
Mock.mock(mockPath.changeUserName, 'post', changeUserName);
// 添加用户
Mock.mock(mockPath.createUser, 'post', createUser);
// 更改个人信息
Mock.mock(mockPath.changeUserSignatures, 'post', changeUserSignatures);
// 修改密码
Mock.mock(mockPath.changePasswords, 'post', changePasswords);

// 学习管理获取学习记录总条数
Mock.mock(mockPath.getLearnRecordsTotal, 'post', getLearnRecordsTotal);
// 管理员获取课程分类
Mock.mock(mockPath.adminSort, 'post', adminSort);
// 教师获取课程分类
Mock.mock(mockPath.teacherSort, 'post', teacherSort);
// 获取学习记录列表
Mock.mock(mockPath.getSearchRecordsList, 'post', getSearchRecordsList);
// 关闭一条学习记录
Mock.mock(mockPath.delrecord, 'post', delrecord);
// 关闭选中的学习记录
Mock.mock(mockPath.delrecordList, 'post', delrecordList);

// 获取日志列表
Mock.mock(mockPath.getLogList, 'post', getLogList);
// 获取用户列表
Mock.mock(mockPath.getUserLists, 'post', getUserLists);

// 获取左侧教师列表
Mock.mock(mockPath.getteacherList, 'post', getteacherList);
// 获取右侧班级列表
Mock.mock(mockPath.getClassGradesList, 'post', getClassGradesList);

// 学习统计-色块list
Mock.mock(mockPath.getChart, 'post', studyColorList);

export default Mock;

import axios from '@/axios/fetch';
import MockPath from '@/mock/mock_api';

const mockpath = new MockPath();
class Api {
  VUE_APP_MOCK = process.env.VUE_APP_MOCK === '1';

  /**
   * 登录接口
   * @param data 登录信息
   */
  login = (data: unknown) => {
    let path = './api/user/login';
    if (this.VUE_APP_MOCK) {
      path = mockpath.login;
    }
    return axios.post(path, data);
  };

  softConfig = () => axios.get(this.VUE_APP_MOCK ? mockpath.softConfig : './softConfig/get');

  /**
   * 获取用户信息
   */
  getByCode = () => axios.post(this.VUE_APP_MOCK ? mockpath.getByCode : './api/user/getByCode', {
    code: sessionStorage.code,
  });

  /**
   * 修改用户信息
   * @param formData 用户信息
   */
  changeUserInfo = (formData: unknown) => axios.post(this.VUE_APP_MOCK ? mockpath.changeUserName : './api/user/changeUserInfo', formData);

  /**
   * 创建学生&教师
   * @param formData 创建学生&教师
   */
  createClassMember = (formData: unknown) => axios.post(
    this.VUE_APP_MOCK ? mockpath.createUser : './api/classMember/createClassMember',
    formData,
  );

  /**
   * 查询用户列表
   * @param searchData 查询条件
   */
  queryUserList = (searchData: unknown) => axios.post(this.VUE_APP_MOCK ? mockpath.getUserList : './api/user/queryUserList', searchData);

  /**
   * 查询学生列表
   * @param searchData
   */
  queryStudentList = (searchData: unknown) => axios.post(
    this.VUE_APP_MOCK ? mockpath.getStudentList : './api/classMember/listStudent',
    searchData,
  );

  /**
   * 重置用户密码
   * @param BaseUserCodeRequest code
   */
  adminResetPassword = (BaseUserCodeRequest: string) => axios.post(this.VUE_APP_MOCK ? mockpath.resetPassword : './api/user/adminResetPassword', {
    code: BaseUserCodeRequest,
  });

  /**
   * 删除学生
   * @param formData
   */
  delStudent = (formData: unknown) => axios.post(this.VUE_APP_MOCK ? mockpath.delteStudent : './api/userManage/delStudent', formData);

  /**
   * 删除教师
   * @param formData
   */
  delTeacher = (formData: unknown) => axios.post(this.VUE_APP_MOCK ? mockpath.delteTeacher : './api/userManage/delTeacher', formData);

  /**
   * 更改个人信息
   * @param formData
   */
  changeUserSignature = (formData: unknown) => axios.post(
    this.VUE_APP_MOCK ? mockpath.changeUserSignatures : './api/user/changeUserSignature',
    formData,
  );

  /**
   * 修改密码
   * @param formData
   */
  changePassword = (formData: unknown) => axios.post(
    this.VUE_APP_MOCK ? mockpath.changePasswords : './api/user/changePassword',
    formData,
  );

  /**
   * 查询班级列表
   * @param searchData
   */
  getClassList = (searchData: unknown) => axios.post(this.VUE_APP_MOCK ? mockpath.getClassList : './api/class/queryClass', searchData);

  /**
   * 编辑&创建班级
   * @param formData
   */
  editClassData = (formData: unknown) => axios.post(
    this.VUE_APP_MOCK ? mockpath.editClass : './api/class/createOrUpdateClass',
    formData,
  );

  /**
   * 删除班级
   * @param formData
   */
  delClass = (formData: unknown) => axios.post(this.VUE_APP_MOCK ? mockpath.delClass : './api/userManage/delClass', formData);

  /**
   * 导入学生——没有处理mock
   * @param formData
   * @param classId 班级id
   */
  uploadStudentByClass = (formData: unknown, classId: string) => axios.post(`./api/classMember/insertStudent?classId=${classId}`, formData);

  /**
   * 获取学习管理中学习记录的总条数
   */
  getLearnRecordsTotal = () => axios.post(this.VUE_APP_MOCK ? mockpath.getLearnRecordsTotal : '');

  /**
   * 管理员获取课程分类
   */
  adminSort = () => axios.post(this.VUE_APP_MOCK ? mockpath.adminSort : '');

  /**
   * 管理员获取课程分类
   */
  teacherSort = () => axios.post(this.VUE_APP_MOCK ? mockpath.teacherSort : '');

  /**
   * 获取学习记录列表
   * @param formData
   */
  getSearchRecordsList = (formData: unknown) => axios.post(this.VUE_APP_MOCK ? mockpath.getSearchRecordsList : '', formData);

  /**
   * 删除一条学习记录
   * @param formData
   */
   delrecord = (formData: unknown) => axios.post(this.VUE_APP_MOCK ? mockpath.delrecord : '', formData);

   /**
   * 删除选中的学习记录
   * @param formData
   */
    delrecordList = (formData: unknown) => axios.post(this.VUE_APP_MOCK ? mockpath.delrecordList : '', formData);
}

export default new Api();

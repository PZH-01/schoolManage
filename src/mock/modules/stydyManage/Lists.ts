import Mock from 'mockjs';
import MockRequest, { AjaxDate } from '../../MockRequest';

export function adminSort() {
  const pageNo = 1;
  const pageSize = 15;
  const totalRecords = 15;
  return new MockRequest(
    Mock.mock({
      [`list|${pageSize}`]: [
        {
          id: '@guid',
          categoryName: '@cword(3,5)',
        },
      ],
      pageNo,
      totalRecords,
    }),
    '请求成功',
    true,
  );
}
export function teacherSort() {
  const pageNo = 1;
  const pageSize = 15;
  const totalRecords = 15;
  return new MockRequest(
    Mock.mock({
      [`list|${pageSize}`]: [
        {
          id: '@guid',
          categoryName: '@cword(3,5)',
        },
      ],
      pageNo,
      totalRecords,
    }),
    '请求成功',
    true,
  );
}
export function getSearchRecordsList(data: AjaxDate) {
  const { pageNo = 1, pageSize = 15, totalRecords = 500 } = JSON.parse(data.body);
  return Mock.mock(
    new MockRequest(
      {
        [`list|${pageSize}`]: [
          {
            // id
            id: '@guid',
            // 案例编号
            teacherCaseName: '@ctitle',
            // 加入时间
            startDate: '@datetime',
            // 用户账号
            username: '@first',
            // 学习时长
            sumDuration: '@time',
            // pc时长
            duration() {
              return Math.random() * 10000;
            },
            // mb时长
            appDuration() {
              return Math.random() * 10000;
            },
            // 学习状态
            studyStatus() {
              return Math.floor(Math.random() * 3);
            },
          },
        ],
        pageNo,
        totalRecords,
      },
      null,
      true,
    ),
  );
}
export function delrecord(data: AjaxDate) {
  const ids = JSON.stringify(data.body);
  return new MockRequest(ids, '删除成功', true);
}
export function delrecordList(data: AjaxDate) {
  const ids = JSON.stringify(data.body);
  return new MockRequest(ids, '删除成功', true);
}

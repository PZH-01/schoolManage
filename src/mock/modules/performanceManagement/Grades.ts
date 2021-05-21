import Mock from 'mockjs';
import MockRequest, { AjaxDate } from '../../MockRequest';

export function getteacherList() {
  const pageNo = 1;
  const pageSize = 15;
  const totalRecords = 15;
  return new MockRequest(
    Mock.mock({
      [`list|${pageSize}`]: [
        {
          id: '@guid',
          name: '@cname(3,5)',
        },
      ],
      pageNo,
      totalRecords,
    }),
    '请求成功',
    true,
  );
}
export function getClassGradesList(data: AjaxDate) {
  const pageNo = 1;
  const pageSize = 15;
  const totalRecords = 50;
  return new MockRequest(
    Mock.mock({
      [`tableData|${pageSize}`]: [
        {
          id: '@guid',
          name: '@cname 的班级',
          stuNum: '@integer(0,100)',
          jisuanji: '@integer(0,100)',
          riyu: '@integer(0,100)',
          maogai: '@integer(0,100)',
          zhengzhi: '@integer(0,100)',
          chengxu: '@integer(0,100)',
          jiaohu: '@integer(0,100)',
          wangye: '@integer(0,100)',
          meiti: '@integer(0,100)',
          shuzi: '@integer(0,100)',
        },
      ],
      tableName: [
        {
          title: '班级名称',
          dataIndex: 'name',
          align: 'left',
        },
        {
          title: '学生数量',
          dataIndex: 'stuNum',
          align: 'left',
          slots: { customRender: 'studenttotal' },
        },
        {
          title: '计算机应用基础(一)',
          dataIndex: 'jisuanji',
          align: 'left',
        },
        {
          title: '日语入门',
          dataIndex: 'riyu',
          align: 'left',
        },
        {
          title: '毛泽东思想和中国特色社会主义理论体系概论',
          dataIndex: 'maogai',
          align: 'left',
        },
        {
          title: '思想政治理论课社会实践',
          dataIndex: 'zhengzhi',
          align: 'left',
        },
        {
          title: '程序设计基础',
          dataIndex: 'chengxu',
          align: 'left',
        },
        {
          title: '交互设计',
          dataIndex: 'jiaohu',
          align: 'left',
        },
        {
          title: '网页设计与制作',
          dataIndex: 'wangye',
          align: 'left',
        },
        {
          title: '媒体制作综合实训',
          dataIndex: 'meiti',
          align: 'left',
        },
        {
          title: '数字出版物制作实务',
          dataIndex: 'shuzi',
          align: 'left',
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

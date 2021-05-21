import Mock from 'mockjs';
import MockRequest, { AjaxDate } from '../../MockRequest';
// import { }

function studyColorList(data: AjaxDate) {
  const requestData = JSON.parse(data.body);
  console.log(requestData, '请求data'); // @integer(1,99999)
  return Mock.mock(
    new MockRequest([
      {
        name: '学习记录',
        number: '@integer(1,99999)',
      },
      {
        name: '已完成记录',
        number: '@integer(1,99999)',
      },
      {
        name: '记录累计时长',
        number: '@integer(1,99999)',
      },
      {
        name: '完成者',
        number: '@integer(1,99999)',
      },
    ], null, true),
  );
}
function studyRecordList(data: AjaxDate) {
  const requestData = JSON.parse(data.body);
  const { type } = requestData;
  let reponseData: {}[] = [];
  if (type === 0) {
    reponseData = [
      { xField: '00', yField: '看看显示', seriesField: '@integer(1,99999)' },
      { xField: '01', yField: '看看显示', seriesField: '@integer(1,99999)' },
      { xField: '02', yField: '看看显示', seriesField: '@integer(1,99999)' },
      { xField: '03', yField: '看看显示', seriesField: '@integer(1,99999)' },
      { xField: '04', yField: '看看显示', seriesField: '@integer(1,99999)' },
      { xField: '05', yField: '看看显示', seriesField: '@integer(1,99999)' },
      { xField: '06', yField: '看看显示', seriesField: '@integer(1,99999)' },
      { xField: '07', yField: '看看显示', seriesField: '@integer(1,99999)' },
      { xField: '08', yField: '看看显示', seriesField: '@integer(1,99999)' },
      { xField: '09', yField: '看看显示', seriesField: '@integer(1,99999)' },
      { xField: '10', yField: '看看显示', seriesField: '@integer(1,99999)' },
      { xField: '11', yField: '看看显示', seriesField: '@integer(1,99999)' },
      { xField: '12', yField: '看看显示', seriesField: '@integer(1,99999)' },
      { xField: '13', yField: '看看显示', seriesField: '@integer(1,99999)' },
      { xField: '14', yField: '看看显示', seriesField: '@integer(1,99999)' },
      { xField: '15', yField: '看看显示', seriesField: '@integer(1,99999)' },
      { xField: '16', yField: '看看显示', seriesField: '@integer(1,99999)' },
      { xField: '17', yField: '看看显示', seriesField: '@integer(1,99999)' },
      { xField: '18', yField: '看看显示', seriesField: '@integer(1,99999)' },
      { xField: '19', yField: '看看显示', seriesField: '@integer(1,99999)' },
      { xField: '20', yField: '看看显示', seriesField: '@integer(1,99999)' },
      { xField: '21', yField: '看看显示', seriesField: '@integer(1,99999)' },
      { xField: '22', yField: '看看显示', seriesField: '@integer(1,99999)' },
      { xField: '23', yField: '看看显示', seriesField: '@integer(1,99999)' },
    ];
  } else if (type === 1) {
    reponseData = [
      { xField: '周1', yField: '看看显示', seriesField: '@integer(1,99999)' },
      { xField: '周2', yField: '看看显示', seriesField: '@integer(1,99999)' },
      { xField: '周3', yField: '看看显示', seriesField: '@integer(1,99999)' },
      { xField: '周4', yField: '看看显示', seriesField: '@integer(1,99999)' },
      { xField: '周5', yField: '看看显示', seriesField: '@integer(1,99999)' },
      { xField: '周6', yField: '看看显示', seriesField: '@integer(1,99999)' },
      { xField: '周7', yField: '看看显示', seriesField: '@integer(1,99999)' },
    ];
  } else if (type === 2) {
    reponseData = [
      { xField: '2020-12-01', yField: '看看显示', seriesField: '@integer(1,99999)' },
      { xField: '2020-12-02', yField: '看看显示', seriesField: '@integer(1,99999)' },
      { xField: '2020-12-03', yField: '看看显示', seriesField: '@integer(1,99999)' },
      { xField: '2020-12-04', yField: '看看显示', seriesField: '@integer(1,99999)' },
      { xField: '2020-12-05', yField: '看看显示', seriesField: '@integer(1,99999)' },
      { xField: '2020-12-06', yField: '看看显示', seriesField: '@integer(1,99999)' },
      { xField: '2020-12-07', yField: '看看显示', seriesField: '@integer(1,99999)' },
      { xField: '2020-12-08', yField: '看看显示', seriesField: '@integer(1,99999)' },
      { xField: '2020-12-09', yField: '看看显示', seriesField: '@integer(1,99999)' },
      { xField: '2020-12-10', yField: '看看显示', seriesField: '@integer(1,99999)' },
      { xField: '2020-12-11', yField: '看看显示', seriesField: '@integer(1,99999)' },
      { xField: '2020-12-12', yField: '看看显示', seriesField: '@integer(1,99999)' },
      { xField: '2020-12-13', yField: '看看显示', seriesField: '@integer(1,99999)' },
      { xField: '2020-12-14', yField: '看看显示', seriesField: '@integer(1,99999)' },
      { xField: '2020-12-15', yField: '看看显示', seriesField: '@integer(1,99999)' },
      { xField: '2020-12-16', yField: '看看显示', seriesField: '@integer(1,99999)' },
      { xField: '2020-12-17', yField: '看看显示', seriesField: '@integer(1,99999)' },
      { xField: '2020-12-18', yField: '看看显示', seriesField: '@integer(1,99999)' },
      { xField: '2020-12-19', yField: '看看显示', seriesField: '@integer(1,99999)' },
      { xField: '2020-12-20', yField: '看看显示', seriesField: '@integer(1,99999)' },
      { xField: '2020-12-21', yField: '看看显示', seriesField: '@integer(1,99999)' },
      { xField: '2020-12-22', yField: '看看显示', seriesField: '@integer(1,99999)' },
      { xField: '2020-12-23', yField: '看看显示', seriesField: '@integer(1,99999)' },
      { xField: '2020-12-24', yField: '看看显示', seriesField: '@integer(1,99999)' },
      { xField: '2020-12-25', yField: '看看显示', seriesField: '@integer(1,99999)' },
      { xField: '2020-12-26', yField: '看看显示', seriesField: '@integer(1,99999)' },
      { xField: '2020-12-27', yField: '看看显示', seriesField: '@integer(1,99999)' },
      { xField: '2020-12-28', yField: '看看显示', seriesField: '@integer(1,99999)' },
      { xField: '2020-12-29', yField: '看看显示', seriesField: '@integer(1,99999)' },
      { xField: '2020-12-30', yField: '看看显示', seriesField: '@integer(1,99999)' },
      { xField: '2020-12-31', yField: '看看显示', seriesField: '@integer(1,99999)' },
    ];
  }
  return Mock.mock(
    new MockRequest({
      reponseData,
    }, null, true),
  );
}
function getAuthorInfo(data: AjaxDate) {
  const body: { id: string} = JSON.parse(data.body);
  return Mock.mock(
    new MockRequest({
      id: body.id || 'AuthorId',
      avatar: "@image('50x50', '#50B347', '#FFF', '头像')",
      authorName: '@ctitle(3,7)', // 方案名称
      remark: '@title()', // 备注
    }, null, true),
  );
}

export {
  studyColorList, studyRecordList, getAuthorInfo,
};

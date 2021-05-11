import Mock from 'mockjs';
import MockRequest from '../../MockRequest';

export function getLearnRecordsTotal() {
  return Mock.mock(
    new MockRequest(
      {
        // 全部记录
        total: '@integer(0,10000)',
        // 待学习
        tolearn: '@integer(0,10000)',
        // 待完成
        learning: '@integer(0,10000)',
        // 已完成
        completed: '@integer(0,10000)',
        // 异常
        abnormal: '@integer(0,1000)',
      },
      null,
      true,
    ),
  );
}

export function test() {
  return {};
}

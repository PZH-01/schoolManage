import Mock from 'mockjs';
import MockRequest, { AjaxDate } from '../../MockRequest';

export function getLogList(data: AjaxDate) {
  const { pageNo = 1, pageSize = 15, totalRecords = 500 } = JSON.parse(data.body);
  return Mock.mock(
    new MockRequest(
      {
        [`list|${pageSize}`]: [
          {
            // key
            id: '@guid',
            // 登录时间
            logintime: '@datetime',
            // 登录人员
            logincode: '@cname',
            // 终端类型
            terminal: 'WEB端',
            // 浏览器/终端版本s
            edition: 'Firefox 68.0',
            // 操作系统
            system: 'Win10',
            // 设备名称
            devicename: 'WindirPC',
            // MAC地址
            macaddress: 'E8-4E-06-51-3B-16',
            // 登录IP
            ip: '@ip',
            // 地址
            address: '@county(true)',
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

export function getUserLists() {
  return Mock.mock(
    new MockRequest(
      {
        'list|500': [
          {
            // key
            code: '@guid',
            // 登录人员
            name: '@cname',
          },
        ],
      },
      null,
      true,
    ),
  );
}

import moment, { Moment } from 'moment';
import { isProxy, toRaw } from 'vue';
// import XLSX from 'xlsx';

export interface ESheetList {
  userCode: string;
  userName: string;
  '学生账号': string; // 虽然可以用中文做键，但是肯定有编码问题所以没有用该字段
  '学生姓名': string;
}
export interface ExcelSheet {
  sheetName: string;
  sheet: ESheetList[];
}
/**
 * @description: 读取excel
 * @param {File} file
 * @return Promise
 */
// export const fileExcel = (file: File) => new Promise(((resolve, reject) => {
//   if (file) {
//     const fileBlob = new Blob([file], { type: 'binary' });
//     const reader = new FileReader();
//     let wb: XLSX.WorkBook;
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     reader.onload = (ev: any) => {
//       const data = ev.target.result;
//       wb = XLSX.read(data, {
//         type: 'binary',
//       });
//       const result: ExcelSheet[] = [];
//       wb.SheetNames.forEach((sheetName) => {
//         result.push({
//           sheetName,
//           sheet: XLSX.utils.sheet_to_json(wb.Sheets[sheetName]),
//         });
//       });
//       resolve(result);
//     };
//     reader.readAsBinaryString(fileBlob);
//     // reader.readAsBinaryString(file) // 传统input方法
//   } else {
//     reject();
//   }
// }));

/**
 * @description Rankpicker 时间转换，因为Proxy下的Rank数组 Proxy|Moment统一转换
 * @param MomentArr Moment数组【Proxy, Moment】
 * @return ['日期', '日期']
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const momentProxyTrans = (MomentArr: any, type = 'date') => {
  if (MomentArr.length) {
    const format = type === 'date' ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm:ss';
    let startTime = ''; let endTime = '';
    if (isProxy(MomentArr[0])) {
      startTime = moment(toRaw(MomentArr[0])).format(format);
    } else {
      startTime = moment(MomentArr[0]).format(format);
    }
    if (isProxy(MomentArr[1])) {
      endTime = moment(toRaw(MomentArr[1])).format(format);
    } else {
      endTime = moment(MomentArr[1]).format(format);
    }
    return [startTime, endTime];
  }
  return ['', ''];
};

export const momentTransSingle = (MomentData: Moment|undefined, type = 'date') => {
  if (MomentData) {
    const format = type === 'date' ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm:ss';
    if (isProxy(MomentData)) {
      return moment(toRaw(MomentData)).format(format);
    }
    return moment(MomentData).format(format);
  }
  return undefined;
};

/**
 * @description 0~99 阿拉伯数 转 汉字
 * @param num number
 */
export const numberConvertToUppercase = (num: number): string => {
  const upperNumbers: string[] = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '百', '千', '万', '亿'];
  const { length } = String(num);
  if (length === 1) {
    return upperNumbers[num];
  } if (length === 2) {
    if (num === 10) {
      return upperNumbers[num];
    } if (num > 10 && num < 20) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const index: any = String(num);
      return `十${upperNumbers[index.charAt(1)]}`;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const index: any = String(num);
    return `${upperNumbers[index.charAt(0)]}十${upperNumbers[index.charAt(1)].replace('零', '')}`;
  }
  // TODO: 超出99暂不考虑
  return '';
};

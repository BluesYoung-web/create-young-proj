/*
 * @Author: zhangyang
 * @Date: 2022-12-27 11:15:10
 * @LastEditTime: 2022-12-27 16:09:13
 * @Description:
 */

import defu from 'defu';
import '@midwayjs/core';

/**
 * 接口状态码
 */
export enum Code {
  success = 0,
  fail = -1,
}

const defaultSuccess: ResponseMsg = {
  code: Code.success,
  data: {},
  msg: '操作成功！',
};

const defaultFail: ResponseMsg = {
  code: Code.fail,
  data: {},
  msg: '操作失败！',
};

export const success = (res: Partial<ResponseMsg> = defaultSuccess) => defu(res, defaultSuccess);

export const fail = (res: Partial<ResponseMsg> = defaultSuccess) => defu(res, defaultFail);

declare module '@midwayjs/core' {
  interface Context {
    helper: {
      success: typeof success;
      fail: typeof fail;
    };
  }
}

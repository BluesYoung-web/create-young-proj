/*
 * @Author: zhangyang
 * @Date: 2022-12-27 11:06:11
 * @LastEditTime: 2022-12-27 11:14:48
 * @Description:
 */
import { Catch } from '@midwayjs/decorator';
import { httpError, MidwayHttpError } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { Code } from '../types';

@Catch(httpError.NotFoundError)
export class NotFoundFilter {
  async catch(err: MidwayHttpError, ctx: Context) {
    // 404 错误会到这里
    ctx.status = 404;
    return {
      code: Code.fail,
      msg: '404, ' + ctx.path,
      data: null,
    } as ResponseMsg;
  }
}

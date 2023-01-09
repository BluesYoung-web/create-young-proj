/*
 * @Author: zhangyang
 * @Date: 2022-12-27 11:18:26
 * @LastEditTime: 2022-12-27 11:18:27
 * @Description:
 */
import { Catch } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { Code } from '../types';

@Catch()
export class DefaultErrorFilter {
  async catch(err: Error, ctx: Context) {
    // 所有的未分类错误会到这里
    ctx.status = 500;
    return {
      code: Code.fail,
      msg: err.message,
      data: null,
    } as ResponseMsg;
  }
}

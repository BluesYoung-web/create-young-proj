/*
 * @Author: zhangyang
 * @Date: 2022-12-27 15:10:18
 * @LastEditTime: 2022-12-27 16:12:42
 * @Description:
 */
import { IMiddleware } from '@midwayjs/core';
import { Middleware } from '@midwayjs/decorator';
import { NextFunction, Context } from '@midwayjs/koa';
import { fail, success } from '../types';

@Middleware()
export class HelperMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      ctx.helper = {
        success,
        fail,
      };

      return next();
    };
  }

  static getName(): string {
    return 'helper';
  }
}

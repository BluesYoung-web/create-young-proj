/*
 * @Author: zhangyang
 * @Date: 2022-12-27 16:05:38
 * @LastEditTime: 2023-01-09 10:16:46
 * @Description:
 */
import { Middleware } from '@midwayjs/decorator';
import { PassportMiddleware, AuthenticateOptions } from '@midwayjs/passport';
import { JwtStrategy } from '../strategy/jwt.strategy';
import { Context } from '@midwayjs/koa';
@Middleware()
export class JwtPassportMiddleware extends PassportMiddleware(JwtStrategy) {
  getAuthenticateOptions(): Promise<AuthenticateOptions> | AuthenticateOptions {
    return {};
  }

  /**
   * 免验 jwt 的白名单
   */
  ignore(ctx: Context) {
    ctx.logger.info(ctx.path);
    return [
      '/api/base/login',
      // 初始化后台数据表，仅供开发使用
      // '/api/admin/init',
    ].includes(ctx.path);
  }

  static getName(): string {
    return 'jwt';
  }
}

/*
 * @Author: zhangyang
 * @Date: 2022-12-27 16:24:46
 * @LastEditTime: 2023-01-06 16:31:19
 * @Description:
 */
import { Inject, Controller, Post, Body } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { Validate } from '@midwayjs/validate';
import { UserService } from '../service';
import { UserLoginDTO } from './dto';
import * as md5 from 'md5';
import { JwtService } from '@midwayjs/jwt';
import { CacheManager } from '@midwayjs/cache';

@Controller('/base')
export class UserController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Inject()
  jwt: JwtService;

  @Inject()
  cacheManager: CacheManager;

  @Validate()
  @Post('/login')
  async login(@Body() form: UserLoginDTO) {
    const { username, password } = form;
    const user = await this.userService.findOne({
      username,
    });

    if (user) {
      const key = this.ctx.app.getConfig('keys');
      const exp = this.ctx.app.getConfig('jwt.expiresIn');
      if (md5(`${key}${password}`) === user.password) {
        const token = this.jwt.signSync({
          username,
          password,
          nickname: user.nickname,
        });
        const cacheKey = `${username}.menu.tree`;
        await this.cacheManager.del(cacheKey);
        return this.ctx.helper.success({
          data: {
            /**
             * 过期时间，毫秒
             */
            expires: new Date(Date.now() + exp * 1000),
            token,
          },
          msg: '登录成功！',
        });
      } else {
        return this.ctx.helper.fail({
          msg: '用户名或密码错误！',
        });
      }
    } else {
      return this.ctx.helper.fail({
        msg: '用户名不存在！',
      });
    }
  }
}

/*
 * @Author: zhangyang
 * @Date: 2022-12-27 11:02:18
 * @LastEditTime: 2023-01-09 15:05:25
 * @Description:
 */
import { Configuration, App } from '@midwayjs/decorator';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import * as orm from '@midwayjs/typeorm';
import * as passport from '@midwayjs/passport';
import * as jwt from '@midwayjs/jwt';
import * as cache from '@midwayjs/cache';
import { join } from 'path';
// import { DefaultErrorFilter } from './filter/default.filter';
// import { NotFoundFilter } from './filter/notfound.filter';
import { ReportMiddleware, HelperMiddleware, JwtPassportMiddleware } from './middleware';

@Configuration({
  imports: [
    koa,
    orm,
    jwt,
    passport,
    validate,
    {
      // 环境探测，类似于 php-info，仅 dev 模式启用
      // 访问 /_info 可以查看
      component: info,
      enabledEnvironment: ['local'],
    },
    cache
  ],
  importConfigs: [join(__dirname, './config')],
})
export class ContainerLifeCycle {
  @App()
  app: koa.Application;

  async onReady() {
    // add middleware
    this.app.useMiddleware([ReportMiddleware, HelperMiddleware, JwtPassportMiddleware]);
    // add filter
    // this.app.useFilter([NotFoundFilter, DefaultErrorFilter]);
  }
}

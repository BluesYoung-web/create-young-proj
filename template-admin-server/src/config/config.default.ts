/*
 * @Author: zhangyang
 * @Date: 2022-12-27 10:56:45
 * @LastEditTime: 2023-01-09 15:14:11
 * @Description:
 */
import { MidwayAppInfo, MidwayConfig } from '@midwayjs/core';
import * as Entities from '../entities';

export default (appInfo: MidwayAppInfo): MidwayConfig => {
  const SERCRET_KEY = 'bluesyoung_web';
  return {
    // 用于对 cookie 进行签名
    keys: SERCRET_KEY,
    koa: {
      port: +process.env.LISTEN_PORT || 7001,
      globalPrefix: '/api',
    },
    typeorm: {
      dataSource: {
        default: {
          type: 'mysql',
          // 以下为 MySQL 配置
          username: 'root',
          password: 'root',
          port: 3306,
          database: 'dev_music',
          charset: 'utf8mb4',
          // 生产环境，不同步数据库表结构
          synchronize: process.env.NODE_ENV !== 'production',
          logging: false,
          entities: Object.values(Entities),
        },
      },
    },
    jwt: {
      secret: SERCRET_KEY,
      /**
       * 过期时间，秒
       */
      expiresIn: 60 * 60 * 24,
    },
    passport: {
      /**
       * 不序列化到 session
       */
      session: false,
    },
    validate: {
      validationOptions: {
        // 允许传递未定义的参数
        allowUnknown: true,
      },
    },
  };
};

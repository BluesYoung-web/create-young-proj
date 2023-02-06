/*
 * @Author: zhangyang
 * @Date: 2023-01-04 18:53:23
 * @LastEditTime: 2023-01-04 19:12:55
 * @Description: 在插件中读取环境变量，避免重复的文件 io
 */
import { resolve } from 'node:path';
import { loadConfig } from 'c12';
// @ts-ignore
export default defineNitroPlugin(async (app) => {
  const env = (process.env.DEPLOY_ENV as 'dev' | 'test' | 'online') || 'dev';
  const { config } = await loadConfig({
    name: env,
    cwd: resolve(process.cwd(), 'config'),
  });

  for (const key in config) {
    if (Object.prototype.hasOwnProperty.call(config, key)) {
      process.env[key] = config[key];
    }
  }

  console.log('------------------------读取配置文件------------------------');
  console.log(config);
  console.log('------------------------------------------------------------');
});

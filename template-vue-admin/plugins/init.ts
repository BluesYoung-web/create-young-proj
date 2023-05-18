/*
 * @Author: zhangyang
 * @Date: 2023-01-04 18:53:23
 * @LastEditTime: 2023-05-18 16:10:14
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
    defaultConfig: {
      // 由于频繁修改 package.json 会浪费 docker 性能，故将版本信息放于此处
      // 优先读取环境变量中的版本信息(自己打的 Tag)
      VITE_CURRENT_VERSION: process.env.PROJECT_VERSION || '0.5.5',
    },
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

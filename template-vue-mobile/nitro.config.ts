/*
 * @Author: zhangyang
 * @Date: 2022-12-28 11:59:56
 * @LastEditTime: 2022-12-28 12:18:46
 * @Description:
 */
import { defineNitroConfig } from 'nitropack';

export default defineNitroConfig({
  /**
   * 托管前端静态资源
   */
  serveStatic: 'node',
  publicAssets: [
    {
      dir: 'dist',
    },
  ],
});

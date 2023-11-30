/*
 * @Author: zhangyang
 * @Date: 2022-12-28 11:59:56
 * @LastEditTime: 2023-11-30 12:08:40
 * @Description:
 */
export default defineNitroConfig({
  /**
   * 托管前端静态资源
   */
  serveStatic: 'node',
  publicAssets: [
    {
      dir: '.vitepress/dist',
    },
  ],
});


/*
 * @Author: zhangyang
 * @Date: 2022-12-28 11:59:56
 * @LastEditTime: 2024-02-02 16:20:57
 * @Description:
 */
export default defineNitroConfig({
  /**
   * 托管前端静态资源
   */
  serveStatic: 'node',
  publicAssets: [
    {
      // 原始静态资源打包后的目录
      dir: 'dist',
    },
  ],
  routeRules: {
    '/get/env': {
      cors: true,
    },
  },
})

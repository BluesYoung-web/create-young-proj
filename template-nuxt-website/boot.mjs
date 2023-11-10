/*
 * @Author: zhangyang
 * @Date: 2022-09-07 09:31:12
 * @LastEditTime: 2023-11-10 09:41:43
 * @Description:
 */
(async () => {
  const env = process.env.DEPLOY_ENV
  const listenPort = process.env.LISTEN_PORT || 3003

  /**
   * !!! 接口缓存时间基准配置，默认 60s
   */
  const NUXT_PUBLIC_CACHE_TIME = 60

  if (!(+process.env.NUXT_PUBLIC_CACHE_TIME > 0))
    process.env.NUXT_PUBLIC_CACHE_TIME = NUXT_PUBLIC_CACHE_TIME

  console.log('当前环境：', env)
  console.log('服务监听端口：', listenPort)

  process.env.NITRO_PORT = listenPort

  await import('./dist/server/index.mjs')
})()

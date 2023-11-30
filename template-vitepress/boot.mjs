/*
 * @Author: zhangyang
 * @Date: 2022-09-16 11:48:05
 * @LastEditTime: 2023-11-09 11:59:07
 * @Description:
 */
(async () => {
  const env = process.env.DEPLOY_ENV || 'dev'
  const listenPort = process.env.LISTEN_PORT || 3333
  console.log('当前环境：', env)
  console.log('服务监听端口：', listenPort)

  process.env.NITRO_PORT = listenPort

  await import('./.output/server/index.mjs')
})()

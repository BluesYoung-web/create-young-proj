/*
 * @Author: zhangyang
 * @Date: 2022-09-16 11:48:05
 * @LastEditTime: 2022-12-29 16:21:59
 * @Description:
 */
(async () => {
  const env = process.env.DEPLOY_ENV;
  const listenPort = process.env.LISTEN_PORT || 3003;
  console.log('当前环境：', env);
  console.log('服务监听端口：', listenPort);

  process.env.NITRO_PORT = listenPort;

  await import('./.output/server/index.mjs');
})();

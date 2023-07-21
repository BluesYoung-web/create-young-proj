/*
 * @Author: zhangyang
 * @Date: 2022-09-07 09:31:12
 * @LastEditTime: 2023-05-26 11:21:19
 * @Description:
 */
(async () => {
  const env = process.env.DEPLOY_ENV;
  const listenPort = process.env.LISTEN_PORT || 3003;
  console.log('当前环境：', env);
  console.log('服务监听端口：', listenPort);

  process.env.NITRO_PORT = listenPort;

  await import('./dist/server/index.mjs');
})();

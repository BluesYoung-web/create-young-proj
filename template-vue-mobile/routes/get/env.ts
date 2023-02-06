/*
 * @Author: zhangyang
 * @Date: 2022-11-18 10:55:50
 * @LastEditTime: 2023-02-01 12:17:15
 * @Description:
 */

/**
 * 存储前端需要的环境变量
 */
const envObj: any = {};

export default eventHandler(async (event) => {
  if (Object.keys(envObj).length === 0) {
    for (const key in process.env) {
      if (Object.prototype.hasOwnProperty.call(process.env, key) && key.startsWith('VITE_')) {
        envObj[key] = process.env[key];
      }
    }
  }

  event.node.res.setHeader('Access-Control-Allow-Origin', '*');

  return envObj as ImportMetaEnv;
});

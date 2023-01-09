/*
 * @Author: zhangyang
 * @Date: 2022-11-18 10:55:50
 * @LastEditTime: 2023-01-04 19:06:46
 * @Description:
 */
export default defineEventHandler(async (event) => {
  const envObj: any = {};
  for (const key in process.env) {
    if (Object.prototype.hasOwnProperty.call(process.env, key) && key.startsWith('VITE_')) {
      envObj[key] = process.env[key];
    }
  }

  event.node.res.setHeader('Access-Control-Allow-Origin', '*');

  return envObj as ImportMetaEnv;
});

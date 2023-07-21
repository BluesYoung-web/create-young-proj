/*
 * @Author: zhangyang
 * @Date: 2023-07-20 19:48:12
 * @LastEditTime: 2023-07-20 19:54:44
 * @Description:
 */
export default defineEventHandler(async (event) => {
  const envObj = {
    NUXT_PUBLIC_CURRENT_VERSION: process.env.PROJECT_VERSION || '0.0.1',
  };

  return envObj;
});

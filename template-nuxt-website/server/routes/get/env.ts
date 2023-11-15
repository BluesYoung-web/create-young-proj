/*
 * @Author: zhangyang
 * @Date: 2023-07-20 19:48:12
 * @LastEditTime: 2023-07-21 11:18:40
 * @Description:
 */
export default defineEventHandler(async (event) => {
  const envObj = {
    NUXT_PUBLIC_CURRENT_VERSION: process.env.PROJECT_VERSION || 'v0.0.1',
  }

  return envObj
})

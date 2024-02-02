/*
 * @Author: zhangyang
 * @Date: 2023-07-20 19:48:12
 * @LastEditTime: 2024-02-02 15:53:15
 * @Description:
 */
export default eventHandler(async (event) => {
  const envObj = {
    NUXT_PUBLIC_CURRENT_VERSION: process.env.PROJECT_VERSION || 'v0.0.1',
  }

  return envObj
})

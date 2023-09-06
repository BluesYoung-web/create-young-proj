/*
 * @Author: zhangyang
 * @Date: 2023-07-21 09:50:36
 * @LastEditTime: 2023-07-21 09:50:36
 * @Description:
 */
export default eventHandler(async (event) => {
  const proxy = createTransparentProxy(process.env.NUXT_PUBLIC_API_BASE as string)
  await proxy.handle(event)
})

/*
 * @Author: zhangyang
 * @Date: 2023-07-21 09:50:36
 * @LastEditTime: 2024-03-08 15:02:22
 * @Description:
 */
import { createProxyEventHandler } from 'h3-proxy'

export default eventHandler(async (event) => {
  const proxy = createProxyEventHandler({
    target: process.env.NUXT_PUBLIC_API_BASE as string,
  })
  return proxy(event)
})

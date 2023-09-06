/*
 * @Author: zhangyang
 * @Date: 2023-05-29 10:29:52
 * @LastEditTime: 2023-06-17 16:20:40
 * @Description:
 */
import { type ServerOptions as HTTPProxyOptions } from 'http-proxy'
import ProxyModule from 'http-proxy'
import type { H3Event } from 'h3'

/**
 * @param target 接口代理的具体地址
 * @param defaults 代理配置
 * @example
 * export default defineEventHandler(async (event) => {
 *   const proxy = createTransparentProxy(`http://127.0.0.1:3333`);
 *   await proxy.handle(event);
 * });
 */
export function createTransparentProxy(target: string, defaults: HTTPProxyOptions = {}) {
  const proxy = ProxyModule.createProxy()
  const handle = (event: H3Event, opts: HTTPProxyOptions = {}) => {
    return new Promise<void>((resolve, reject) => {
      proxy.web(event.node.req, event.node.res, { target, ...defaults, ...opts }, (error: any) => {
        if (error.code !== 'ECONNRESET')
          reject(error)

        resolve()
      })
    })
  }
  return {
    proxy,
    handle,
  }
}

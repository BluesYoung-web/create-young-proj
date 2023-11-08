/*
 * @Author: zhangyang
 * @Date: 2023-09-27 11:22:08
 * @LastEditTime: 2023-11-01 19:10:45
 * @Description:
 */
import type { ServerOptions as HTTPProxyOptions } from 'http-proxy'
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

/**
 * 服务端发送的请求
 */
export function useServerFetch(event: H3Event, prefix = '/index') {
  const BaseServerURL = `${process.env.VITE_BACKEND_SERVER}${prefix}` as const

  return $fetch.create({
    baseURL: BaseServerURL,
    headers: {
      'platform-source': event.context.platformSource,
      'x-real-ip': event.context['x-real-ip']!,
      'x-forwarded-for': event.context['x-forwarded-for']!,
    },
    async onRequest({ request, options }) {
      const { onRequest, onResponse, onRequestError, onResponseError, ...opts } = options
      console.log('🚀 ~ onRequest ~ request: %o, options: %o', request, opts)
    },
    async onResponse({ response }) {
      console.log('🚀 ~ onResponse ~ data:', response._data)
    },
  })
}

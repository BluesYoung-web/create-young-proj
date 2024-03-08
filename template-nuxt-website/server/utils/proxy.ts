/*
 * @Author: zhangyang
 * @Date: 2023-09-27 11:22:08
 * @LastEditTime: 2024-03-08 15:05:53
 * @Description:
 */
import type { H3Event } from 'h3'

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

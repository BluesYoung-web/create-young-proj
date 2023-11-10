/*
 * @Author: zhangyang
 * @Date: 2023-06-07 12:06:48
 * @LastEditTime: 2023-11-10 15:02:45
 * @Description:
 */
import { NUXT_PUBLIC_CACHE_TIME } from '~~/composables/config'
/**
 * @example 服务端请求示例
 */
export default cachedEventHandler(async (event) => {
  // const ServerFetch = useServerFetch(event)

  try {
    // const { gray = false } = (await ServerFetch<{ gray: boolean }>('/api/v1/is_gray')) || {}
    return {
      /**
       * 是否置灰
       */
      is_gray: false,
      /**
       * 全局置灰为 *
       * 否则仅首页置灰
       */
      scope: '',
    }
  }
  catch (error) {
    console.error('get gray status fail: ', error)
    return {
      is_gray: false,
      scope: '',
    }
  }
}, {
  maxAge: NUXT_PUBLIC_CACHE_TIME * 5,
  swr: true,
})

/*
 * @Author: zhangyang
 * @Date: 2024-01-18 09:36:06
 * @LastEditTime: 2024-02-01 17:16:07
 * @Description:
 */
import { useHttp } from '@bluesyoung/http'
import { useGet } from './get'
import { usePost } from './post'

export function ajaxStartLoading() {
  console.log('todo: start loading')
}

export function ajaxEndLoading() {
  console.log('todo: end loading')
}

export const http = useHttp<IResult>({
  timeout: -1,
  // lazyBaseURL: () => window.__YOUNG_ENV__.NUXT_PUBLIC_API_BASE,
  loading: {
    start: ajaxStartLoading,
    end: ajaxEndLoading,
  },
  fail: (err: any) => {
    console.log('🚀 ~ file: 3-net.ts:60 ~ err', err, typeof err)
    // if (err?.response?.status === 401) {
    //   useUserStore().removeToken()
    //   checkLogin(true)

    //   throw err
    // }
    // if (typeof err === 'string') {
    //   // 通用失败，弹出提示信息
    //   ElMessage.error(err)
    // }
    // if (isObject(err)) {
    //   ElMessage.error(err?.response?.data?.retinfo
    //     || err?.response?.data?.message
    //     || err?.response?.data?.msg
    //     || err?.response?.data
    //     || err.message
    //     || '网络错误！')
    // }

    throw err
  },
})

export const apis = http.__mixin__({
  get: useGet(http),
  post: usePost(http),
})

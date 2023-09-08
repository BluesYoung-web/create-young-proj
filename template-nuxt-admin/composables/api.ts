/*
 * @Author: zhangyang
 * @Date: 2023-06-20 17:14:58
 * @LastEditTime: 2023-09-08 10:09:03
 * @Description:
 */
import { useHttp } from '@bluesyoung/http'
import { useDelete, useGet, usePatch, usePost } from './apis'

export function startLoading() {
  const { isLoading } = storeToRefs(useNavStore())
  isLoading.value = true
}

export function endLoading() {
  const { isLoading } = storeToRefs(useNavStore())
  isLoading.value = false
}

const http = useHttp<{
  code: number
  data: any
  msg: string
}>({
  timeout: -1,
  loading: {
    start: startLoading,
    end: endLoading,
  },
  fail: (err: any) => {
    console.log('🚀 ~ file: api.ts:28 ~ err:', err)
    const user = useUserStore()
    if (err?.response?.status === 401) {
      user.removeToken()
      checkLogin(true)

      throw err
    }

    if (typeof err === 'string') {
      // 通用失败，弹出提示信息
      showNotify({
        type: 'danger',
        message: err,
      })
    }
    if ((err as any) instanceof Error) {
      showNotify({
        type: 'danger',
        // 接口出错
        message:
          err?.response?.data?.message
          || err?.response?.data?.msg
          || err?.response?.data
          || err.message
          || '网络错误！',
      })
    }

    throw err
  },
  headers: {
    getAuthHeaders: () => {
      const { token } = storeToRefs(useUserStore())
      return {
        Authorization: `Bearer ${token.value}`,
      }
    },
  },
  checkFn: ({ code, msg, data }) => {
    if (code === 0) {
      // 通用成功
      return data
    }
    else if (code === -1) {
      // 通用失败
      throw msg
    }
    else {
      // 特殊状态码
      throw code
    }
  },
})

export const apis = http.__mixin__({
  get: useGet(http),
  post: usePost(http),
  patch: usePatch(http),
  delete: useDelete(http),
})

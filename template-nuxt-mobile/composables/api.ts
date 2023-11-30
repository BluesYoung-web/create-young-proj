/*
 * @Author: zhangyang
 * @Date: 2023-06-20 17:14:58
 * @LastEditTime: 2023-11-29 17:50:40
 * @Description:
 */
import { useHttp } from '@bluesyoung/http'
import { useGet, usePost } from './apis'

const http = useHttp<{
  code: number
  data: any
  msg: string
}>({
  timeout: -1,
  loading: {
    start: showLoading,
    end: hideLoading,
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
      ElMessage.error(err)
    }
    if ((err as any) instanceof Error) {
      ElMessage.error(err?.response?.data?.message
        || err?.response?.data?.msg
        || err?.response?.data
        || err.message
        || '网络错误！')
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
})

export const apis = http.__mixin__({
  get: useGet(http),
  post: usePost(http),
})

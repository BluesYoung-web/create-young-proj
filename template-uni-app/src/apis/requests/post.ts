/*
 * @Author: zhangyang
 * @Date: 2023-07-18 16:59:34
 * @LastEditTime: 2023-09-19 10:20:17
 * @Description:
 */
import type { YoungHttp, YoungHttpAuthReq, YoungHttpFreeReq } from '@bluesyoung/http'

export function usePost(http: YoungHttp) {
  const FreeReq: YoungHttpFreeReq = args => http.freeReq({ method: 'GET', ...args })
  const AuthReq: YoungHttpAuthReq = args => http.authReq({ method: 'GET', ...args })

  return {
    createRepo: async (name: string) => {
      await AuthReq({
        url: '/user/repos',
        params: {
          name,
        },
      })
    },
  }
}

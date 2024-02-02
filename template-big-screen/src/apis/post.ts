/*
 * @Author: zhangyang
 * @Date: 2023-07-21 09:21:02
 * @LastEditTime: 2024-02-01 19:16:34
 * @Description:
 */
import type { YoungHttp, YoungHttpAuthReq, YoungHttpFreeReq } from '@bluesyoung/http'

export function usePost(http: YoungHttp) {
  const FreeReq: YoungHttpFreeReq = args => http.freeReq({ method: 'POST', ...args })
  const AuthReq: YoungHttpAuthReq = args => http.authReq({ method: 'POST', ...args })

  return {}
}

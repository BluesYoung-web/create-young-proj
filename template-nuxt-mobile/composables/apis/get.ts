/*
 * @Author: zhangyang
 * @Date: 2023-07-21 09:09:37
 * @LastEditTime: 2023-11-29 17:36:23
 * @Description:
 */
import type { YoungHttp, YoungHttpAuthReq, YoungHttpFreeReq } from '@bluesyoung/http'

export function useGet(http: YoungHttp) {
  const FreeReq: YoungHttpFreeReq = args => http.freeReq({ method: 'GET', ...args })
  const AuthReq: YoungHttpAuthReq = args => http.authReq({ method: 'GET', ...args })

  return {
    /**
     * 发送短信验证码
     */
    sendCode: async (phone: string) => {
      showToast(`todo: ${phone}发送短信验证码`)
      // await FreeReq({ url: '/v1/user/sendCode', params: { phone } });
    },
  }
}

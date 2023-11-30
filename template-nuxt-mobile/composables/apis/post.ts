/*
 * @Author: zhangyang
 * @Date: 2023-07-21 09:21:02
 * @LastEditTime: 2023-11-29 17:53:30
 * @Description:
 */
import type { YoungHttp, YoungHttpAuthReq, YoungHttpFreeReq } from '@bluesyoung/http'
import { telMasaike } from '@bluesyoung/utils'

export function usePost(http: YoungHttp) {
  const FreeReq: YoungHttpFreeReq = args => http.freeReq({ method: 'POST', ...args })
  const AuthReq: YoungHttpAuthReq = args => http.authReq({ method: 'POST', ...args })

  return {
    login: async (args: LoginForm) => {
      console.log('🚀 ~ file: post.ts:15 ~ login: ~ args:', args)

      return {
        uuid: '9527',
        nickname: '用户xxx',
        headimgurl: 'https://avatars.githubusercontent.com/u/55608642?v=4',
        token: 'xxxxxxxxx',
        phone: telMasaike(args.tel),
      } as UserLoginRes
    },
    changePassword: async (args: ResetPasswdForm) => {
      console.log('🚀 ~ file: post.ts:15 ~ login: ~ args:', args)
      showToast('todo: user change password')

      return {
        uuid: '9527',
        nickname: '用户xxx',
        headimgurl: 'https://avatars.githubusercontent.com/u/55608642?v=4',
        token: 'xxx',
        phone: telMasaike(args.tel),
      } as UserLoginRes
    },
  }
}

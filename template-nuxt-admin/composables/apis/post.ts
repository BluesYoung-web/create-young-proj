/*
 * @Author: zhangyang
 * @Date: 2023-07-21 09:21:02
 * @LastEditTime: 2023-07-26 16:39:22
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

      const { token } = await FreeReq({
        url: '/base/login',
        data: {
          username: 'super',
          password: '123456',
        },
      })

      return {
        uuid: '9527',
        nickname: '用户xxx',
        headimgurl: 'https://avatars.githubusercontent.com/u/55608642?v=4',
        token,
        phone: telMasaike(args.mobile),
      } as UserLoginRes
    },
    changePassword: async (args: LoginForm) => {
      console.log('🚀 ~ file: post.ts:15 ~ login: ~ args:', args)
      showToast('todo: user change password')

      return {
        uuid: '9527',
        nickname: '用户xxx',
        headimgurl: 'https://avatars.githubusercontent.com/u/55608642?v=4',
        token: 'xxx',
        phone: telMasaike(args.mobile),
      } as UserLoginRes
    },

    /**
     * 创建接口
     */
    addApiItem: async (data: ApiItem) => {
      await AuthReq({
        url: '/api/create',
        data,
      })
    },
    /**
     * 创建菜单
     */
    addMenuItem: async (data: NavArrItem) => {
      await AuthReq({
        url: '/menu/create',
        data,
      })
    },
    /**
     * 创建角色
     */
    addRoleItem: async (data: RoleItem) => {
      await AuthReq({
        url: '/role/create',
        data,
      })
    },

    /**
     * 创建用户
     */
    addUserItem: async (data: UserItem) => {
      await AuthReq({
        url: '/user/create',
        data,
      })
    },
  }
}

/*
 * @Author: zhangyang
 * @Date: 2023-07-21 09:09:37
 * @LastEditTime: 2023-07-26 11:58:32
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
    /**
     * 获取用户的菜单树
     */
    getUserMenuTree: async () => {
      return AuthReq<Record<number, NavArrItem>>({
        url: '/menu/tree',
      })
    },
    /**
     * 获取角色列表
     */
    getRoleList: async (params: Partial<BaseQuery> = {}) =>
      AuthReq<PagesData>({
        url: '/role/list',
        params,
      }),
    /**
     * 获取用户列表
     */
    getUserList: async (params: Partial<BaseQuery> = {}) =>
      AuthReq<PagesData>({
        url: '/user/list',

        params,
      }),
    /**
     * 获取菜单列表
     */
    getMenuList: async () =>
      AuthReq<Record<string, NavArrItem>>({
        url: '/menu/list',
      }),
    /**
     * 获取接口列表
     */
    getApiList: async (params: Partial<BaseQuery> = {}) =>
      AuthReq<PagesData>({
        url: '/api/list',

        params,
      }),
    /**
     * 获取角色拥有权限的菜单
     */
    getRoleMenuTree: async (id: number) =>
      AuthReq<{
        list: NavArrItem[]
        accessIds: number[]
      }>({
        url: `/menu/all/${id}`,
      }),
    /**
     * 获取角色拥有的接口权限
     */
    getRoleApis: async (id: number) =>
      AuthReq<{
        list: ApiItem[]
        accessIds: number[]
      }>({
        url: `/api/all/category/${id}`,
      }),
  }
}

/*
 * @Author: zhangyang
 * @Date: 2023-07-26 11:54:08
 * @LastEditTime: 2023-07-26 11:56:39
 * @Description:
 */
import type { YoungHttp, YoungHttpAuthReq } from '@bluesyoung/http'

export function useDelete(http: YoungHttp) {
  const AuthReq: YoungHttpAuthReq = args => http.authReq({ method: 'DELETE', ...args })

  const del = async (url: string, ids: string) => {
    await AuthReq({
      url,
      data: { ids },
    })
  }

  return {
    /**
     * 删除用户
     */
    deleteUser: async (ids: string) => del('/user/delete/batch', ids),
    /**
     * 删除菜单
     */
    deleteMenu: async (ids: string) => del('/menu/delete/batch', ids),
    /**
     * 删除接口
     */
    deleteApi: async (ids: string) => del('/api/delete/batch', ids),
    /**
     * 删除角色
     */
    deleteRole: async (ids: string) => del('/role/delete/batch', ids),
  }
}

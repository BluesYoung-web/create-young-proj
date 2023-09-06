/*
 * @Author: zhangyang
 * @Date: 2023-07-26 11:51:44
 * @LastEditTime: 2023-07-26 16:37:45
 * @Description:
 */
import type { YoungHttp, YoungHttpAuthReq } from '@bluesyoung/http'

export function usePatch(http: YoungHttp) {
  const AuthReq: YoungHttpAuthReq = args => http.authReq({ method: 'PATCH', ...args })

  return {
    /**
     * 更新接口
     */
    changeApiItem: async ({ id, ...data }: Partial<ApiItem>) => {
      await AuthReq({
        url: `/api/update/${id}`,
        data,
      })
    },
    /**
     * 更新菜单信息
     */
    changeMenuItem: async ({ id, ...data }: Partial<NavArrItem>) => {
      await AuthReq({
        url: `/menu/update/${id}`,
        data,
      })
    },
    /**
     * 更新角色
     */
    changeRoleItem: async ({ id, ...data }: Partial<RoleItem>) => {
      await AuthReq({
        url: `/role/update/${id}`,
        data,
      })
    },
    /**
     * 更新角色菜单权限
     */
    changeRoleMenu: async (roleId: number, add: number[], del: number[]) => {
      await AuthReq({
        url: `role/menus/update/${roleId}`,
        data: {
          create: add,
          delete: del,
        },
      })
    },
    /**
     * 更新角色接口权限
     */
    changeRoleApi: async (roleId: number, add: number[], del: number[]) => {
      await AuthReq({
        url: `role/apis/update/${roleId}`,
        data: {
          create: add,
          delete: del,
        },
      })
    },
    /**
     * 更新用户信息
     */
    changeUserItem: async ({ id, ...data }: Partial<UserItem>) => {
      await AuthReq({
        url: `/user/update/${id}`,
        data,
      })
    },
  }
}

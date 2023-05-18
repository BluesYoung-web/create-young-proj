/*
 * @Author: zhangyang
 * @Date: 2023-01-04 19:31:22
 * @LastEditTime: 2023-01-06 16:50:47
 * @Description:
 */
import { http } from '@/modules/3-net';

const method = 'PATCH';

export const usePatchReq = () => ({
  /**
   * 更新用户信息
   */
  changeUserItem: async ({ id, ...data }: Partial<UserItem>) => {
    await http.authReq({
      url: `/user/update/${id}`,
      method,
      data,
    });
  },
  /**
   * 更新菜单信息
   */
  changeMenuItem: async ({ id, ...data }: Partial<NavArrItem>) => {
    await http.authReq({
      url: `/menu/update/${id}`,
      method,
      data,
    });
  },
  /**
   * 更新接口
   */
  changeApiItem: async ({ id, ...data }: Partial<ApiItem>) => {
    await http.authReq({
      url: `/api/update/${id}`,
      method,
      data,
    });
  },
  /**
   * 更新角色
   */
  changeRoleItem: async ({ id, ...data }: Partial<RoleItem>) => {
    await http.authReq({
      url: `/role/update/${id}`,
      method,
      data,
    });
  },
  /**
   * 更新角色菜单权限
   */
  changeRoleMenu: async (roleId: number, add: number[], del: number[]) => {
    await http.authReq({
      url: `role/menus/update/${roleId}`,
      method,
      data: {
        create: add,
        delete: del,
      },
    });
  },
  /**
   * 更新角色接口权限
   */
  changeRoleApi: async (roleId: number, add: number[], del: number[]) => {
    await http.authReq({
      url: `role/apis/update/${roleId}`,
      method,
      data: {
        create: add,
        delete: del,
      },
    });
  },
});

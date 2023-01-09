/*
 * @Author: zhangyang
 * @Date: 2023-01-06 10:50:53
 * @LastEditTime: 2023-01-06 14:08:45
 * @Description:
 */
import { http } from '@/modules/3-net';

const method = 'DELETE';

const del = async (url: string, ids: string) => {
  await http.authReq({
    url,
    method,
    data: { ids },
  });
};

export const useDeleteReq = () => ({
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
});

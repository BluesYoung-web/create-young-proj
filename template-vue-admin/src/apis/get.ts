/*
 * @Author: zhangyang
 * @Date: 2023-01-04 19:31:22
 * @LastEditTime: 2023-01-09 09:07:32
 * @Description:
 */
import { http } from '@/modules/3-net';
import { useNavStore } from '@/stores';
import { ApiItem } from '@/typings';

const method = 'GET';

export const useGetReq = () => ({
  /**
   * 获取当前用户的菜单树
   */
  getMenuTree: async (force = false) => {
    const { RawNav } = useNavStore();
    if (!force && RawNav.value.length > 0) {
      return Promise.resolve(RawNav.value);
    }
    return http.authReq<Record<number, NavArrItem>>({
      url: '/menu/tree',
      method,
    });
  },
  /**
   * 获取角色列表
   */
  getRoleList: async (params: Partial<BaseQuery> = {}) =>
    http.authReq<PagesData>({
      url: `/role/list`,
      params,
      method,
    }),
  /**
   * 获取用户列表
   */
  getUserList: async (params: Partial<BaseQuery> = {}) =>
    http.authReq<PagesData>({
      url: '/user/list',
      method,
      params,
    }),
  /**
   * 获取菜单列表
   */
  getMenuList: async () =>
    http.authReq<Record<string, NavArrItem>>({
      url: '/menu/list',
      method,
    }),
  /**
   * 获取接口列表
   */
  getApiList: async (params: Partial<BaseQuery> = {}) =>
    http.authReq<PagesData>({
      url: '/api/list',
      method,
      params,
    }),
  /**
   * 获取角色拥有权限的菜单
   */
  getRoleMenuTree: async (id: number) =>
    http.authReq<{
      list: NavArrItem[];
      accessIds: number[];
    }>({
      url: `/menu/all/${id}`,
      method,
    }),
  /**
   * 获取角色拥有的接口权限
   */
  getRoleApis: async (id: number) =>
    http.authReq<{
      list: ApiItem[];
      accessIds: number[];
    }>({
      url: `/api/all/category/${id}`,
      method,
    }),
});

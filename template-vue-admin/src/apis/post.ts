/*
 * @Author: zhangyang
 * @Date: 2023-01-04 11:33:12
 * @LastEditTime: 2023-05-18 16:14:20
 * @Description:
 */
import { http } from '@/modules/3-net';
import { useUserStore } from '@/stores';

export const usePostReq = () => ({
  /**
   * 登录
   */
  login: async (data: {
    /**
     * 用户名
     */
    username: string;
    /**
     * 密码
     */
    password: string;
  }) =>
    http.freeReq<UserKey>({
      url: '/base/login',
      data,
    }),
  /**
   * 获取当前用户的信息
   */
  getCurrUserInfo: async () => {
    const { CurrUserInfo } = useUserStore();
    if (CurrUserInfo.value.id) {
      return Promise.resolve(CurrUserInfo.value);
    }
    return http.authReq<CurrUserInfo>({
      url: '/user/info',
    });
  },
  /**
   * 创建用户
   */
  addUserItem: async (data: UserItem) => {
    await http.authReq({
      url: '/user/create',
      data,
    });
  },
  /**
   * 创建菜单
   */
  addMenuItem: async (data: NavArrItem) => {
    await http.authReq({
      url: '/menu/create',
      data,
    });
  },
  /**
   * 创建接口
   */
  addApiItem: async (data: ApiItem) => {
    await http.authReq({
      url: '/api/create',
      data,
    });
  },
  /**
   * 创建角色
   */
  addRoleItem: async (data: RoleItem) => {
    await http.authReq({
      url: '/role/create',
      data,
    });
  },
});

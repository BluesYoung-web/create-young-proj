/*
 * @Author: zhangyang
 * @Date: 2022-03-01 19:40:13
 * @LastEditTime: 2023-01-09 09:19:41
 * @Description: 权限校验
 */
import { router } from './1-router';
import type { RouteLocationNormalized } from 'vue-router';
import { useNavStore, useTagsStore, useUserStore, getToken } from '@/stores';
import { apis } from './3-net';

const changeTitle = (route: RouteLocationNormalized) => {
  document.title =
    (route.meta.title as string) || window.__YOUNG_VITE_ENV__.VITE_TITLE || '管理后台';
};

const { CurrUserInfo } = useUserStore();
const { NavArrAll, RoleRoute, FlatNavArr, RawNav } = useNavStore();

let role_route: string[] = [];
const generateRoleRoute = (arr: NavArrItem[], num?: number): string[] => {
  if (num === 1) {
    role_route = [];
    FlatNavArr.value = [];
  }
  for (const item of arr) {
    if (item.component) {
      role_route.push(item.component);
      +item.visible === 1 && FlatNavArr.value.push(item);
    }
    // 子节点递归遍历
    if (Array.isArray(item.children) && item.children.length > 0) {
      const part = JSON.parse(JSON.stringify(item.children));
      // 尾递归优化
      generateRoleRoute(part);
    }
  }
  return role_route;
};
// 清除没有子元素的children
export const clearChildren = <T extends Record<string, any>>(arr: T[]) => {
  for (const item of arr) {
    if (item?.children.length === 0) {
      delete item.children;
    } else if (item.children) {
      clearChildren(item.children);
    }
  }
  return arr;
};

export const generateNavData = async () => {
  const info = await apis.post.getCurrUserInfo();

  if (!info) {
    return;
  }

  const menu = Object.values(await apis.get.getMenuTree());
  CurrUserInfo.value = info;
  RawNav.value = menu;

  // 后端获取用户可见节点
  const navArr: NavArrItem[] = menu;
  const routes: string[] = generateRoleRoute(menu, 1);

  // 导航数组
  NavArrAll.value = navArr.filter((item) => +item.visible === 1);
  // 生成角色有权访问的路由
  RoleRoute.value = routes.slice();
};

export const hasPermission = (path: string) => {
  const { RoleRoute } = useNavStore();
  const roleRoute = RoleRoute.value;
  return roleRoute.includes(path);
};

export const install: UserModule = (app) => {
  router.beforeEach(async (to, from) => {
    /* 授权登录，暂未启用
    const { code, state } = Object.fromEntries(new URLSearchParams(location.search));
    if (code && state) {
      (await casdoorLogin(code, state)) as UserKey;
      getToken() && (await generateNavData());
      location.search = '';
      changeTitle(to);
      return true;
    } else 
    */
    if (to.path !== '/base/login') {
      // 页面无需权限
      if (!to.meta.authPath) {
        return true;
      }
      // 已登录
      if (getToken()) {
        // 生成权限树
        await generateNavData();
        if (hasPermission(to.meta.authPath)) {
          // 拥有对应页面的权限
          changeTitle(to);
          return true;
        }
        if (!hasPermission(to.meta.authPath)) {
          // 已登录，并且无权限
          changeTitle(from);
          return '/403';
        }
      } else {
        return '/base/login';
      }
    } else {
      return true;
    }
  });

  router.afterEach((to) => {
    const { addView } = useTagsStore();
    addView(to);
  });
};

/*
 * @Author: zhangyang
 * @Date: 2022-03-01 19:40:13
 * @LastEditTime: 2023-02-01 11:46:18
 * @Description: 权限校验
 */
import { router } from './1-router';
import type { RouteLocationNormalized } from 'vue-router';
import { YoungLocalStorage } from '@bluesyoung/utils';

const changeTitle = (to: RouteLocationNormalized) => {
  document.title = to.meta.title || (import.meta.env.VITE_TITLE as string);
};

export const hasPermission = (path: string) => {};

export const sureLeave = async () => {
  try {
    await showConfirmDialog({
      title: '温馨提示',
      message: '您确定要离开吗？',
    });
    return true;
  } catch (error) {
    return false;
  }
};

export const install: UserModule = (app) => {
  // todo: 按需替换为 api 操作
  const store = new YoungLocalStorage();
  const api = {
    getInfo: () => store.get('user.info'),
    setInfo: () => store.set('user.info', { key: 'cdcsdfdf' }),
  };

  router.beforeEach(async (to, from) => {
    // auth
    if (to.meta.auth) {
      const info = await api.getInfo();
      if (info) {
        return true;
      }
      try {
        // todo: 可根据情况替换为跳转登录页, /base/login
        await showDialog({
          title: '温馨提示',
          message: '我是默认的登录框，点击即登录',
          showCancelButton: true,
        });
        await api.setInfo();
        return true;
      } catch (error) {
        return false;
      }
    } else {
      return true;
    }
  });

  router.afterEach((to) => {
    changeTitle(to);
  });
};

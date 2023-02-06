/*
 * @Author: zhangyang
 * @Date: 2022-03-01 14:01:31
 * @LastEditTime: 2023-02-01 11:22:42
 * @Description: 路由模块
 */
import { createRouter, createWebHashHistory } from 'vue-router';
import { setupLayouts } from 'virtual:generated-layouts';
import routes from '~pages';

/**
 * 路由元数据类型扩展
 */
declare module 'vue-router' {
  interface RouteMeta {
    /**
     * 页面标题
     */
    title: string;
    /**
     * 需要登录，不设置则为白名单页面
     */
    auth?: boolean;
    /**
     * 页面布局，对应 layouts 目录下的布局页面，默认为 default
     */
    layout?: 'default' | 'sub' | 'blank';
  }
}

export const finalRoutes = setupLayouts(routes);

export const router = createRouter({
  history: createWebHashHistory(),
  routes: finalRoutes,
});

export const install: UserModule = (app) => {
  app.use(router);
};

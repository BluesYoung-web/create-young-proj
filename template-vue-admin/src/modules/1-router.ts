/*
 * @Author: zhangyang
 * @Date: 2023-01-04 10:15:03
 * @LastEditTime: 2023-01-05 14:26:22
 * @Description: 路由模块
 */
import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router';
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
     * 是否固定
     */
    affix?: boolean;
    /**
     * 是否禁用缓存
     */
    noCache?: boolean;
    /**
     * 鉴权路径，不设置则为白名单页面
     */
    authPath?: string;
    /**
     * 页面布局，对应 layouts 目录下的布局页面，不写默认为 default/index
     */
    layout?: 'blank';
  }
}

export const finalRoutes = setupLayouts(routes);
export const navMap = new Map<string, string>();

/**
 * 生成权限节点映射表
 */
const generateNavMap = (raw: RouteRecordRaw[], base = '') => {
  for (const route of raw) {
    if (route.children) {
      generateNavMap(route.children, route.path);
    } else {
      const meta = route.meta;
      if (meta && meta.authPath) {
        navMap.set(meta.authPath, `${base}${route.path.startsWith('/') ? '' : '/'}${route.path}`);
      }
    }
  }
};
generateNavMap(finalRoutes);

export const router = createRouter({
  history: createWebHashHistory(),
  routes: finalRoutes,
});

export const install: UserModule = (app) => {
  app.use(router);
};

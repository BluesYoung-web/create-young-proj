/*
 * @Author: zhangyang
 * @Date: 2023-01-04 10:15:03
 * @LastEditTime: 2023-05-18 15:45:18
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
     * 是否固定
     */
    affix?: boolean;
    /**
     * 是否禁用缓存
     */
    noCache?: boolean;
    /**
     * 设置 false 不参与鉴权，否则鉴权路径为当前路由
     */
    auth?: false;
    /**
     * 页面布局，对应 layouts 目录下的布局页面，不写默认为 default/index
     */
    layout?: 'blank';
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

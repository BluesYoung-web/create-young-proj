/*
 * @Author: zhangyang
 * @Date: 2022-12-03 15:57:40
 * @LastEditTime: 2022-12-03 16:23:01
 * @Description:
 */
// polyfill
import 'core-js/stable';
import 'regenerator-runtime/runtime';
// 统一浏览器样式
import '@unocss/reset/tailwind.css';
import 'uno.css';

// 路由
import { createRouter, createWebHashHistory } from 'vue-router';
import { setupLayouts } from 'virtual:generated-layouts';
import routes from '~pages';

import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);

// 路由配置
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
    // auth?: boolean;
    /**
     * 页面布局，对应 layouts 目录下的布局页面，默认为 default
     */
    layout?: 'default' | 'list' | 'blank';
  }
}

// 自动生成路由
const finalRoutes = setupLayouts(routes);
const router = createRouter({
  history: createWebHashHistory(),
  routes: finalRoutes,
});

app.use(router);

// pinia
const pinia = createPinia();
app.use(pinia);

app.mount('#app');

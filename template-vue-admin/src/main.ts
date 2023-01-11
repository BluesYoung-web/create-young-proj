/*
 * @Author: zhangyang
 * @Date: 2022-12-03 15:57:40
 * @LastEditTime: 2023-01-10 15:09:29
 * @Description:
 */
// polyfill
import 'core-js/stable';
import 'regenerator-runtime/runtime';
// 统一浏览器样式
import '@unocss/reset/tailwind.css';
import 'uno.css';
import 'element-plus/dist/index.css';

import { createApp } from 'vue';
import { server } from 'virtual:local-server';
import App from './App.vue';

(async () => {
  // 获取环境变量
  let viteEnv;
  // 注入此环境变量，可以兼容现有的部署方式
  if (import.meta.env.VITE_USE_DEFAULT_DEPLOY_METHOD) {
    viteEnv = import.meta.env;
    console.log('🚀 ~ file: main.ts ~ line 19 ~ viteEnv', viteEnv);
  } else if (import.meta.env.DEV) {
    // 开发环境，局域网 ip
    viteEnv = await (await fetch(server + '/get/env')).json();
    console.log('🚀 ~ file: main.ts ~ line 24 ~ viteEnv', viteEnv);
  } else {
    // 部署环境，需要配合 nginx 使用
    viteEnv = await (await fetch(`/get/env`)).json();
    console.log('🚀 ~ file: main.ts ~ line 28 ~ viteEnv', viteEnv);
  }
  window.__YOUNG_VITE_ENV__ = viteEnv;

  const app = createApp(App);
  Object.values(
    // 模块按数字命名，确保安装的顺序
    import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }),
  ).map(({ install }) => install(app));

  app.mount('#app');
})();

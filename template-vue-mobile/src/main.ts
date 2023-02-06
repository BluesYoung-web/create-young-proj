/*
 * @Author: zhangyang
 * @Date: 2022-12-03 15:57:40
 * @LastEditTime: 2023-02-01 12:01:43
 * @Description:
 */
// polyfill
import 'core-js/stable';
import 'regenerator-runtime/runtime';
// 统一浏览器样式
import '@unocss/reset/tailwind.css';
import 'uno.css';
// vant 指令的样式
import 'vant/es/toast/style/index';
import 'vant/es/dialog/style/index';
import 'vant/es/notify/style/index';
import 'vant/es/image-preview/style/index';

import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);

Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true })).map(
  ({ install }) => install(app),
);

setTimeout(async () => {
  if (window?.__YOUNG_VITE_ENV__?.VITE_ENABLE_VCONSOLE) {
    const VConsole = await (await import('vconsole')).default;
    new VConsole();
  }
}, 1e4);

app.mount('#app');

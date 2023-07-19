/*
 * @Author: zhangyang
 * @Date: 2023-07-18 11:21:31
 * @LastEditTime: 2023-07-18 14:07:16
 * @Description:
 */
import { createSSRApp } from 'vue';
import App from './App.vue';
import { setupStore } from './store';

import 'uno.css';

export function createApp() {
  const app = createSSRApp(App);
  setupStore(app);

  return {
    app,
  };
};

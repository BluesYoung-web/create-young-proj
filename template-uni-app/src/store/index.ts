/*
 * @Author: zhangyang
 * @Date: 2023-07-18 11:21:07
 * @LastEditTime: 2023-07-18 15:20:22
 * @Description:
 */
import type { App } from 'vue';
import { createPinia } from 'pinia';

export function setupStore(app: App) {
  const store = createPinia();
  app.use(store);
};

export * from './local';
export * from './system';

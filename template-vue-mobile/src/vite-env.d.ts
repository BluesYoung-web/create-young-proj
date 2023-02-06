/*
 * @Author: zhangyang
 * @Date: 2022-12-03 15:57:40
 * @LastEditTime: 2023-02-01 11:55:56
 * @Description:
 */
/// <reference types="vite/client" />
/// <reference types="vite-plugin-pages/client" />
/// <reference types="vite-plugin-vue-layouts/client" />

declare module 'virtual:local-server' {
  /**
   * 本地服务地址
   */
  export const server: string;
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

/**
 * import.meta.env 类型提示
 */
declare interface ImportMetaEnv {
  /**
   * 标题
   */
  VITE_TITLE: string;
  /**
   * 是否启用 VConsole
   */
  VITE_ENABLE_VCONSOLE?: string | boolean;
}

/**
 * 扩充 window
 */
interface Window {
  __YOUNG_VITE_ENV__: ImportMetaEnv;
}
/*
 * @Author: zhangyang
 * @Date: 2022-12-03 15:57:40
 * @LastEditTime: 2023-01-05 09:16:16
 * @Description:
 */
/// <reference types="vite/client" />
/// <reference types="vite-plugin-pages/client" />
/// <reference types="vite-plugin-vue-layouts/client" />

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
  VITE_TITLE?: string;

  /**
   * 基础接口请求地址
   */
  VITE_BASE_HTTP: string;


  /**
  * 是否启用 Casdoor
  */
  // VITE_ENABLE_CASDOOR?: string;
  /**
  * Casdoor 相关
  */
  // VITE_CAS_SERVER?: string;
  // VITE_CAS_ID?: string;
  // VITE_CAS_ORG?: string;
  // VITE_CAS_APP?: string;

  /**
   * 是否静态部署
   */
  VITE_USE_DEFAULT_DEPLOY_METHOD?: boolean;
}

declare interface Window {
  __YOUNG_VITE_ENV__: ImportMetaEnv;
}

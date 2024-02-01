/*
 * @Author: zhangyang
 * @Date: 2023-07-19 08:41:05
 * @LastEditTime: 2024-02-01 11:28:01
 * @Description:
 */
/// <reference types="vite/client" />
/// <reference types="@uni-helper/vite-plugin-uni-pages/client" />
declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<{}, {}, any>
  export default component
}

/**
 * import.meta.env.[]
 * 变量语法提示
 */
declare interface ImportMetaEnv {
  /**
   * 接口是否使用自定义 loading
   * src/components/young-loading-mini/young-loading-mini.vue
   */
  VITE_CUSTOM_LOADING: boolean

  /**
   * appid
   */
  VITE_APPID: string

  /**
   * 应用名称
   */
  VITE_APPNAME: string

  /**
   * 接口请求地址
   */
  VITE_API_BASE_URL: string
}

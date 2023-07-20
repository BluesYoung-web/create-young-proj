/*
 * @Author: zhangyang
 * @Date: 2023-07-19 08:41:05
 * @LastEditTime: 2023-07-20 09:45:01
 * @Description:
 */
/// <reference types="vite/client" />
/// <reference types="@uni-helper/vite-plugin-uni-pages/client" />
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

/**
 * import.meta.env.[]
 * 变量语法提示
 */
declare interface ImportMetaEnv {
  /**
   * 公共配置
   */
  VITE_COMMON: string;

  /**
   * 微信小程序 appid
   */
  VITE_APPID: string;

  /**
   * 接口请求地址
   */
  VITE_API_BASE_URL: string;
}

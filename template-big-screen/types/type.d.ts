/*
 * @Author: Leo l024983409@qq.com
 * @Date: 2023-09-23 11:49:49
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-02-02 16:09:31
 * @Description:
 */
// vite-env.d.ts
/// <reference types="vite-plugin-pages/client" />

interface IResult<T = any> {
  data: T
  message: string
  code: number
}
interface ImportMetaEnv {
  /**
   * 接口请求地址
   */
  NUXT_PUBLIC_API_BASE: string
  /**
   * 版本号
   */
  NUXT_PUBLIC_CURRENT_VERSION: string
}
interface IDescription {
  label: string
  value: string
  increment: string
}

declare interface Window {
  __YOUNG_ENV__: ImportMetaEnv
}

declare module 'virtual:local-server' {
  const server: string
}

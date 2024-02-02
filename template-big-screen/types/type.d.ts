/*
 * @Author: Leo l024983409@qq.com
 * @Date: 2023-09-23 11:49:49
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-02-02 15:36:17
 * @Description:
 */
// vite-env.d.ts
/// <reference types="vite-plugin-pages/client" />

declare global{
  interface IResult<T = any> {
    data: T
    message: string
    code: number
  }
  interface ImportMetaEnv {
    VITE_BASE_URL: string
  }
  interface IDescription {
    label: string
    value: string
    increment: string
  }

  interface Window {
    __YOUNG_ENV__: ImportMetaEnv
  }
}

/*
 * @Author: zhangyang
 * @Date: 2023-05-26 11:50:06
 * @LastEditTime: 2023-11-29 17:21:16
 * @Description:
 */
/**
 * 环境变量
 */
interface ImportMetaEnv {
  /**
   * 微信公众号 appid，用于网页授权登录，SDK 签名等
   */
  VITE_WECHAT_APPID: string

  /**
   * 默认标题
   */
  VITE_TITLE: string

  /**
   * 调试控制台
   */
  VITE_VCONSOLE?: boolean
};

declare interface Window {
  /**
   * 注入到前端使用的环境变量
   */
  __YOUNG_ENV__: ImportMetaEnv
};

declare module '#app' {
  interface PageMeta {
    /**
     * 顶部标题
     */
    title?: string
    /**
     * 不受 container 的宽度限制
     */
    full?: boolean
    /**
     * main 背景色
     */
    bgColor?: string
  }
}

/**
 * 路由元数据类型扩展
 */
declare module 'vue-router' {
  interface RouteMeta {
    /**
     * 页面标题
     */
    title: string
    /**
     * 默认需要登录，显示设置为 false 则无需登录
     */
    auth?: boolean
  }
}

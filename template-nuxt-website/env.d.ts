/*
 * @Author: zhangyang
 * @Date: 2023-05-26 11:50:06
 * @LastEditTime: 2023-11-08 10:44:03
 * @Description:
 */
declare global {
  /**
   * 环境变量
   */
  interface ImportMetaEnv {
    /**
     * 管理后台，后端接口地址，ssr 数据获取
     */
    VITE_BACKEND_SERVER: string
    /**
     * 管理后台，后端接口地址，浏览器端调用
     */
    VITE_BACKEND_SERVER_CLIENT: string
    /**
     * 微信公众号 appid，用于网页授权登录，SDK 签名等
     */
    VITE_WECHAT_APPID: string

    /**
     * 后台上传的资源前缀
     */
    VITE_OSS_URL: string

    /**
     * PC 网址
     */
    VITE_WEBSITE_PC: string
    /**
     * 移动端地址
     */
    VITE_WEBSITE_MOBILE: string

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
    /**
     * 当前用户的 openid，用于 微信 jssdk 支付
     */
    YOUNG_WECHAT_OPENID: string
  };
}

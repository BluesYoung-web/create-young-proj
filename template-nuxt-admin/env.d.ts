/*
 * @Author: zhangyang
 * @Date: 2023-05-26 11:50:06
 * @LastEditTime: 2023-07-24 10:31:33
 * @Description:
 */

/**
 * 环境变量
 */
interface ImportMetaEnv {
  /**
   * 当前版本
   */
  NUXT_PUBLIC_CURRENT_VERSION: string;
  /**
   * 后台服务器地址
   */
  NUXT_PUBLIC_API_BASE: string;
  /**
   * 后台标题
   */
  NUXT_PUBLIC_TITLE: string;
  /**
   * 后台副标题
   */
  NUXT_PUBLIC_SUB_TITLE?: string;
  /**
   * slogan
   */
  NUXT_PUBLIC_SLOGAN?: string;
  /**
   * 登录背景图
   */
  NUXT_PUBLIC_LOGIN_BG: string;
  /**
   * 后台 logo
   */
  NUXT_PUBLIC_LOGIN_LOGO: string;
};

declare interface Window {
  /**
   * 注入到前端使用的环境变量
   */
  __YOUNG_ENV__: ImportMetaEnv;
};

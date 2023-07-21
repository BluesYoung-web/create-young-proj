/*
 * @Author: zhangyang
 * @Date: 2023-05-26 11:50:06
 * @LastEditTime: 2023-07-20 19:27:23
 * @Description:
 */

/**
 * 环境变量
 */
interface ImportMetaEnv {
  /**
   * 后台服务器地址
   */
  NUXT_PUBLIC_API_BASE: string;
};

declare interface Window {
  /**
   * 注入到前端使用的环境变量
   */
  __YOUNG_ENV__: ImportMetaEnv;
};

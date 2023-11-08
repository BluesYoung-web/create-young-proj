/*
 * @Author: zhangyang
 * @Date: 2023-09-27 11:35:38
 * @LastEditTime: 2023-11-08 10:24:29
 * @Description:
 */
interface BannerItem {
  /**
   * 图片地址
   */
  img_url: string
  /**
   * 图片标题
   */
  title?: string
  /**
   * 安卓跳转地址
   */
  android_url?: string
  /**
   * ios 跳转地址
   */
  ios_url?: string
  /**
   * 是否为视频
   */
  is_video?: boolean

  type?: number
}

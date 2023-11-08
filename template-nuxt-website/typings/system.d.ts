/*
 * @Author: zhangyang
 * @Date: 2023-09-27 12:09:55
 * @LastEditTime: 2023-09-27 12:18:44
 * @Description:
 */
interface NavItem {
  /**
   * 跳转地址
   */
  href: string
  /**
   * 标题
   */
  title: string
}

interface SeoInfo {
  title: string
  keywords: string
  description: string
}

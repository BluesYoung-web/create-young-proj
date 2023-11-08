/*
 * @Author: zhangyang
 * @Date: 2023-10-07 15:59:27
 * @LastEditTime: 2023-10-31 17:09:32
 * @Description:
 */
interface FriendLinkItem {
  title: string
  href: string
}

interface FollowItem {
  icon: string
  name: string
  qrcode: string
  jump?: string
  hidden?: boolean
}

interface AboutNavItem {
  title: string
  url: string
}

interface BreadNavItem {
  title: string
  href: string
}

interface UserCenterNavItem {
  title: string
  icon: string
  to: string
}

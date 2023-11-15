/*
 * @Author: zhangyang
 * @Date: 2023-06-07 14:43:38
 * @LastEditTime: 2023-11-10 15:02:52
 * @Description:
 */
import { NUXT_PUBLIC_CACHE_TIME } from '~~/composables/config'

export default cachedEventHandler(async () => {
  console.log('start get head info')

  try {
    const nav_arr: NavItem[] = [
      { title: '首页', href: '/' },
      { title: '资讯', href: '/news.html' },
      { title: '赛事', href: '/match.html' },
      { title: '商城', href: '/shop.html' },
    ]
    const fromMobile = process.env.PROJECT_NAME === 'mobile'

    return {
      logo_url: 'https://master-web-cdn.laiyouxi.com/platform_index/online/744f27a210a9098c79f58d115cc321ea.png',
      kj_logo_url: 'https://master-web-cdn.laiyouxi.com/platform_index/online/83fa32ed0e3f286fccd93dae7d9bee8c.png',
      nav_arr,
      showAd: false,
      img_ad: '',
      img_btn: '',
      site_url: fromMobile ? process.env.VITE_WEBSITE_MOBILE! : process.env.VITE_WEBSITE_PC!,
    }
  }
  catch (error) {
    console.error('get head info fail: ', error)
    return false
  }
}, {
  maxAge: NUXT_PUBLIC_CACHE_TIME * 5,
  swr: true,
})

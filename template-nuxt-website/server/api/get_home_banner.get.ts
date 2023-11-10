/*
 * @Author: zhangyang
 * @Date: 2023-10-07 17:43:38
 * @LastEditTime: 2023-11-10 15:03:01
 * @Description:
 */
import { NUXT_PUBLIC_CACHE_TIME } from '~~/composables/config'

export default cachedEventHandler(async (event) => {
  console.log('start get home banner')

  try {
    const banners: BannerItem[] = [
      {
        img_url: 'https://master-web-cdn.laiyouxi.com/platform_index/online/files/banner-pc.png'
      }
    ]

    return banners
  }
  catch (error) {
    console.error('get home banner fail: ', error)
    return false
  }
}, {
  maxAge: NUXT_PUBLIC_CACHE_TIME * 3,
  swr: true,
})

/*
 * @Author: zhangyang
 * @Date: 2023-06-07 14:29:59
 * @LastEditTime: 2023-11-08 09:51:06
 * @Description:
 */
import { NUXT_PUBLIC_CACHE_TIME } from '~~/composables/config'

export default cachedEventHandler(async (event) => {
  console.log('start get seo info')

  const { page } = getQuery(event)
  /**
   * 对于特定页面的 seo 进行相应的索引
   */
  console.log('🚀 ~ file: get_seo_info.get.ts:10 ~ cachedEventHandler ~ page:', page)

  try {
    return {
      keywords: '我是关键字，啦啦啦，哈哈哈',
      description: '我是描述，啦啦啦，哈哈哈',
      title: '我是标题，啦啦啦，哈哈哈',
    } as SeoInfo
  }
  catch (error) {
    console.error('get seo info fail: ', error)
    return false
  }
}, {
  maxAge: NUXT_PUBLIC_CACHE_TIME * 30,
  swr: true,
})

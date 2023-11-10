/*
 * @Author: zhangyang
 * @Date: 2023-07-26 11:48:46
 * @LastEditTime: 2023-11-10 10:27:21
 * @Description:
 */
/**
 * 接口缓存基准时间，单位为 s
 */
export const NUXT_PUBLIC_CACHE_TIME = +useRuntimeConfig().public.cacheTime

if (!NUXT_PUBLIC_CACHE_TIME) {
  console.error('配置异常：缓存基准时长 NUXT_PUBLIC_CACHE_TIME', NUXT_PUBLIC_CACHE_TIME)
  process.exit(1)
}

console.log('缓存基准时长 NUXT_PUBLIC_CACHE_TIME：', NUXT_PUBLIC_CACHE_TIME, '秒')

/*
 * @Author: zhangyang
 * @Date: 2023-05-29 10:29:52
 * @LastEditTime: 2023-11-03 15:45:17
 * @Description:
 */
export function getFullAssetsUrl(url: string) {
  if (process.env.NODE_ENV === 'development' || !process.env.NUXT_APP_CDN_URL)
    return url

  return process.env.NUXT_APP_CDN_URL + url
}

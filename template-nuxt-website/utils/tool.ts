/*
 * @Author: zhangyang
 * @Date: 2023-05-28 16:01:24
 * @LastEditTime: 2023-11-08 10:28:46
 * @Description:
 */
import { randomId } from '@bluesyoung/utils'
import { reactive } from 'vue'
import { useMediaQuery } from '@vueuse/core'

/**
 * 生成数组的随机索引
 */
export function getRandomIndex(length: number) {
  return Math.floor(Math.random() * length)
}

/**
 * 设备唯一标识
 */
export function getUUID() {
  return useLocalStorage('uuid', randomId() + randomId() + randomId() + randomId()).value
}

/**
 * 获取服务器资源地址
 * 第二个参数为默认值，默认返回图片占位符，如果不需要请给第二个参数传入 false
 * 第三个参数代表是否拼接基于 oss 的图片处理参数，默认转换为 webp
 */
export function getFullServerUrl(
  name?: string,
  _default: string | false = '/svg/image_placeholder.svg',
  processImage = true,
) {
  if (!name) {
    if (_default === false)
      return ''

    else
      return _default
  }

  if (
    name.startsWith('data:image')
    || name.startsWith('blob:')
    || name.startsWith('http://')
    || name.startsWith('https://')
    || name.startsWith('/_')
  ) {
    if (processImage && !name.startsWith('data:image') && !name.startsWith('blob:') && !name.startsWith('/_')) {
      const u = new URL(name)
      u.searchParams.set('x-oss-process', 'image/quality,Q_75/format,webp')
      return u.toString()
    }
    else {
      return name
    }
  }

  const u = new URL(name, process.server ? process.env.VITE_OSS_URL : window.__YOUNG_ENV__.VITE_OSS_URL)
  if (processImage)
    u.searchParams.set('x-oss-process', 'image/quality,Q_75/format,webp')

  return u.toString()
}

/**
 * 微信分享
 */
export async function useWeChatShare(shareData: {
  title: string
  desc: string
  imgUrl: string
  /**
   * 分享链接
   * @default location.href.split('#')[0]
   */
  link?: string
}) {
  if (process.server)
    return

  /**
   * 分享链接
   */
  const link = shareData.link || location.href.split('#')[0]

  const { jssdkShareSign } = storeToRefs(useShareStore())

  if (!jssdkShareSign.value.timestamp) {
    // todo: 微信签名
    // const signConf = await fetch('/api/wechat/sign', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     wxAppId: window.__YOUNG_ENV__.VITE_WECHAT_APPID,
    //     url: link,
    //   })
    // })

    // jssdkShareSign.value = {
    //   timestamp: `${signConf.timestamp}`, // 必填，生成签名的时间戳
    //   nonceStr: signConf.noncestr, // 必填，生成签名的随机串
    //   signature: signConf.signature, // 必填，签名
    // }
  }

  // @ts-expect-error
  wx.config({
    debug: window.__YOUNG_ENV__.VITE_VCONSOLE, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印
    appId: window.__YOUNG_ENV__.VITE_WECHAT_APPID, // 必填，公众号的唯一标识
    ...jssdkShareSign.value,
    jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData'], // 必填，需要使用的JS接口列表
    openTagList: [], // 可选，需要使用的开放标签列表，例如
  })

  // @ts-expect-error
  wx.ready(() => {
    // 需在用户可能点击分享按钮前就先调用
    // @ts-expect-error
    wx.updateAppMessageShareData({ link, ...shareData })
    // @ts-expect-error
    wx.updateTimelineShareData({ link, ...shareData })
  })
}

/**
 * html 转 text
 */
export function html2text(html: string) {
  if (!html)
    return ''

  return html.toString().replace(/<[^>]+>/g, '')
}

/**
 * 响应式的屏幕大小
 */
export const WindowSize = reactive({
  'lt-sm': useMediaQuery('(max-width: 639.9px)'),
  'sm': useMediaQuery('(min-width: 640px)'),
  'lt-md': useMediaQuery('(max-width: 767.9px)'),
  'md': process.server ? true : useMediaQuery('(min-width: 768px)'),
  'lt-lg': useMediaQuery('(max-width: 1023.9px)'),
  'lg': useMediaQuery('(min-width: 1024px)'),
  'lt-xl': useMediaQuery('(max-width: 1279.9px)'),
  'xl': useMediaQuery('(min-width: 1280px)'),
  'lt-2xl': useMediaQuery('(max-width: 1535.9px)'),
  '2xl': useMediaQuery('(min-width: 1536px)'),
})

/**
 * 当前浏览器是否支持下载
 */
export function isSupportDownload() {
  const NotAllowed = [/Alipay/gim, /BYTEDANCE/gim, /DINGTALK/gim, /MICROMESSENGER/gim]

  return !NotAllowed.some(reg => reg.test(navigator.userAgent))
}

/**
 * 页面滚动是否超过一定距离
 */
export function useScrollOver(distance = 40) {
  const { y } = useScroll(!process.server ? window : null)
  const scrolled = computed(() => y.value > distance)

  return {
    scrolled,
  }
}

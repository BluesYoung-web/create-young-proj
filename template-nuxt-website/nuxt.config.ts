/*
 * @Author: zhangyang
 * @Date: 2023-09-21 15:57:55
 * @LastEditTime: 2023-11-30 11:05:04
 * @Description:
 */
import { resolve } from 'node:path'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  'app': {
    head: {
      htmlAttrs: {
        lang: 'zh-CN',
      },
      viewport: 'width=device-width,initial-scale=1.0,user-scalable=no,shrink-to-fit=no',
      meta: [
        { name: 'theme-color', content: '#ffffff' },
        { name: 'screen-orientation', content: 'portrait' },
        { name: 'x5-orientation', content: 'portrait' },
        { name: 'renderer', content: 'webkit' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'creator', content: 'BluesYoung-web' },
        { 'http-equiv': 'X-UA-Compatible', 'content': 'IE=edge,chrome=1' },
        { id: 'viewportMeta', name: 'viewport', content: 'maximum-scale=1.0,minimum-scale=1.0,user-scalable=0,width=device-width,initial-scale=1.0' },
        { name: 'format-detection', content: 'telephone=no,email=no,date=no,address=no' },
      ],
      script: [
        {
          innerHTML: `
            this.globalThis || (this.globalThis = this);
            window.onerror = function(e) {
              console.log(e)
              window.alert('您的浏览器版本过低，请尝试使用其他浏览器或将浏览器升级至最新版本后重试！');
            }

            // ios 支付宝浏览器，兜底
            const ua = navigator.userAgent;
            const pathname = window.location.pathname;
            if (/Alipay/img.test(ua) && /iPhone/img.test(ua) && pathname !== '/callback_pay.html') {
              alert('当前环境受限，建议使用系统浏览器打开！');
              window.close();
              history.back();
              AlipayJSBridge && AlipayJSBridge.call && AlipayJSBridge.call('popWindow');
            }
          `,
        },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', type: 'image/png', href: '/favicon.ico' },
        { rel: 'apple-touch-icon-precomposed', type: 'image/png', href: '/favicon.ico' },
        // dns 预解析
        { rel: 'dns-prefetch', href: 'https://master-web-cdn.laiyouxi.com' },
        // 图片预加载
        { rel: 'prefetch', href: '/svg/image_placeholder.svg', as: 'image' },
      ],
    },
  },
  'devtools': { enabled: false },
  'modules': [
    'nuxt-swiper',
    '@nuxtjs/device',
    '@pinia/nuxt',
    '@unocss/nuxt',
    '@vueuse/nuxt',
    '@element-plus/nuxt',
    '@vant/nuxt',
    '@formkit/auto-animate/nuxt',
    '@bluesyoung/nuxt3-lazy-load',
  ],
  'unocss': {
    // 默认的 @unocss/reset/tailwind.css 会造成 element 样式异常
    // 手动注入 @unocss/reset/tailwind-compat.css
    preflight: false,
  },

  'nitro': {
    output: {
      dir: resolve(__dirname, './dist'),
    },
    sourceMap: false,
    minify: true,
  },

  '@bluesyoung/nuxt3-lazy-load': {
    defaultImage: '/svg/image_placeholder.svg',
  },

  'routeRules': {
    /**
     * 页面缓存，配置具体数值会被作为 max-age 的值，不过貌似 true 就足够了
     * 根据具体情况自行调整各个路径的对应配置
     */
    '*': { swr: true },
  },

  'vite': {
    build: {
      sourcemap: false,
      // 兼容旧浏览器
      target: ['chrome58'],
      cssTarget: ['chrome58'],
    },
  },
  'runtimeConfig': {
    public: {
      /**
       * 接口缓存基准时间，会被 NUXT_PUBLIC_CACHE_TIME 环境变量覆盖
       */
      cacheTime: 10,
    },
  },
})

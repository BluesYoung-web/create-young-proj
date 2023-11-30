/*
 * @Author: zhangyang
 * @Date: 2023-09-21 15:57:55
 * @LastEditTime: 2023-11-29 16:51:03
 * @Description:
 */
import { resolve } from 'node:path'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  app: {
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
          `,
        },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', type: 'image/png', href: '/favicon.ico' },
        { rel: 'apple-touch-icon-precomposed', type: 'image/png', href: '/favicon.ico' },
      ],
    },
  },
  devtools: { enabled: false },
  modules: [
    '@nuxtjs/device',
    '@pinia/nuxt',
    '@unocss/nuxt',
    '@vueuse/nuxt',
    '@element-plus/nuxt',
    '@vant/nuxt',
  ],
  unocss: {
    // 默认的 @unocss/reset/tailwind.css 会造成 element 样式异常
    // 手动注入 @unocss/reset/tailwind-compat.css
    preflight: false,
  },

  nitro: {
    output: {
      dir: resolve(__dirname, './dist'),
    },
    sourceMap: false,
    minify: true,
  },

  vite: {
    build: {
      sourcemap: false,
      // 兼容旧浏览器
      target: ['chrome58'],
      cssTarget: ['chrome58'],
    },
  },
})

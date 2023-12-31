/*
 * @Author: zhangyang
 * @Date: 2023-09-21 15:57:55
 * @LastEditTime: 2023-12-22 09:31:07
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
      ],
      link: [
        {
          rel: 'icon',
          href: '/favicon.svg',
        },
        {
          rel: 'prefetch',
          as: 'image',
          href: '/image_placeholder.svg',
        },
        {
          rel: 'prefetch',
          as: 'image',
          href: '/tabbar_bg.png',
        },
      ],
      script: [
        {
          innerHTML: `
            this.globalThis || (this.globalThis = this);
            window.onerror = function(e) {
              if (e.toString().includes('ResizeObserver loop')) {
                return;
              }
              console.log(e);
              window.alert('您的浏览器版本过低，请尝试使用其他浏览器或将浏览器升级至最新版本后重试！');
              window.alert(e);
            }
          `,
        },
        {
          src: '/index.umd.js',
          async: true,
        },
      ],
    },
  },

  imports: {
    dirs: ['utils/**/*.{ts,tsx}'],
  },

  nitro: {
    output: {
      dir: resolve(__dirname, './dist'),
    },
    sourceMap: false,
    minify: true,
  },

  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@element-plus/nuxt',
    '@pinia/nuxt',
    '@vant/nuxt',
    '@bluesyoung/ui-vue3-element-plus/nuxt',
  ],

  vite: {
    build: {
      sourcemap: false,
      // 兼容旧浏览器
      target: ['chrome58'],
      cssTarget: ['chrome58'],
    },
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "~/styles/variable.scss";',
        },
      },
    },
  },

  vue: {
    compilerOptions: {
      isCustomElement: tag => ['young-float-ball'].includes(tag),
    },
  },
})

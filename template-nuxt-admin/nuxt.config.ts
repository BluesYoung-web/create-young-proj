/*
 * @Author: zhangyang
 * @Date: 2023-05-25 19:45:20
 * @LastEditTime: 2023-11-07 14:44:22
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
      ],
      link: [
        {
          rel: 'icon',
          href: '/favicon.svg',
        },
        {
          rel: 'preload',
          as: 'image',
          href: '/image_placeholder.svg',
        },
        {
          rel: 'preload',
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
      // 兼容钉钉浏览器
      target: 'es2015',
      sourcemap: false,
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
})

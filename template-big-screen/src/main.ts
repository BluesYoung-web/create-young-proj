/*
 * @Author: Leo l024983409@qq.com
 * @Date: 2023-09-19 20:22:55
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-02-02 16:20:23
 * @Description:
 */
import { server } from 'virtual:local-server'
import appVue from './App.vue'

import '@unocss/reset/tailwind.css'
import './styles/index.scss'
import 'uno.css'
import { setupDirectives } from './directives'
import { setupModules } from './modules'

async function getEnv() {
  try {
    const viteEnv: ImportMetaEnv = await (await fetch(`${server}/get/env`)).json()
    console.log('🚀 ~ getEnv ~ viteEnv:', viteEnv)
    return viteEnv
  }
  catch (error) {
    document.write(`服务启动异常：\n${error}`)
    throw error
  }
}

function checkUpadte() {
  const YOUNG_UPDATE_TIMER = setInterval(() => {
    getEnv().then(({ NUXT_PUBLIC_CURRENT_VERSION }) => {
      if (NUXT_PUBLIC_CURRENT_VERSION !== window.__YOUNG_ENV__.NUXT_PUBLIC_CURRENT_VERSION) {
        clearInterval(YOUNG_UPDATE_TIMER)

        // eslint-disable-next-line no-alert
        alert('检测到新版本，请刷新页面')
        window.location.reload()
      }
    })
  }, 6e4)
}

async function init() {
  const env = await getEnv()
  window.__YOUNG_ENV__ = env

  checkUpadte()
}

function setup() {
  const app = createApp(appVue)

  setupDirectives(app)
  setupModules(app)

  app.mount('#app')
}

init().then(setup)

/*
 * @Author: Leo l024983409@qq.com
 * @Date: 2023-09-19 20:22:55
 * @LastEditors: zhangyang
 * @LastEditTime: 2024-02-01 17:58:23
 * @Description:
 */
import type { App } from 'vue'
import appVue from './App.vue'

import '@unocss/reset/tailwind.css'
import './styles/index.scss'
import 'uno.css'
import { setupDirectives } from './directives'
import { setupModules } from './modules'

function setup() {
  const app = createApp(appVue)

  setupApp(app)
  app.mount('#app')

  function setupApp(app: App) {
    setupDirectives(app)
    setupModules(app)
  }
}

setup()

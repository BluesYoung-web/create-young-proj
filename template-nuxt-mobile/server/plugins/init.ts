/*
 * @Author: zhangyang
 * @Date: 2022-12-30 17:19:42
 * @LastEditTime: 2023-11-29 16:34:50
 * @Description:
 */
import { resolve } from 'node:path'
import { loadConfig } from 'c12'
import { useYoungLogger } from '@bluesyoung/logger'

export default defineNitroPlugin(async (nitroApp) => {
  const IS_PROD = process.env.NODE_ENV !== 'development'
  console.log('🚀 ~ file: init.ts:13 ~ IS_PROD:', IS_PROD)

  const env = (process.env.DEPLOY_ENV as 'dev' | 'test' | 'online') || 'dev'
  const { config } = await loadConfig<Record<string, any>>({
    name: env,
    cwd: resolve(process.cwd(), 'config'),
    defaultConfig: {
      // 优先读取环境变量中的版本信息(自己打的 Tag)
      NUXT_PUBLIC_CURRENT_VERSION: process.env.PROJECT_VERSION || 'v0.0.1',
      // 日志等级
      CONSOLA_LEVEL: 3,
      // 此处可以放置通用的环境变量
      VITE_WECHAT_APPID: 'todo: 微信公众号appid',
      VITE_VCONSOLE: false,
    },
  })

  for (const key in config) {
    if (process.env[key]) {
      console.log('系统环境变量优先: ', key, ' = ', process.env[key], ' -> ', config[key], ' -> ', '覆盖')
      config[key] = process.env[key]
    }
    else {
      process.env[key] = config[key]
    }
    if (!((key.indexOf('NUXT_PUBLIC_') === 0) || (key.indexOf('VITE_') === 0)))
      delete config[key]
  }

  if (IS_PROD) {
    // 格式化日志
    useYoungLogger()
  }

  console.log('------------------------读取配置文件------------------------')
  console.log(config)
  console.log('-------------------------------------------------------------')

  nitroApp.hooks.hook('request', (event) => {
    const ua = event.node.req.headers['user-agent']

    console.log('ua', ua, 'x-forwarded-for', event.node.req.headers['x-forwarded-for'], 'x-real-ip', event.node.req.headers['x-real-ip'])
  })

  nitroApp.hooks.hook('render:html', async (html, { event }) => {
    // 设定视口高度，防止软键盘影响布局
    html.bodyPrepend.push(`
    <script>
    const metaElement = document.querySelector('#viewportMeta');
    metaElement.setAttribute('content', \`maximum-scale=1.0,minimum-scale=1.0,user-scalable=0,width=device-width,initial-scale=1.0,height=\${window.innerHeight}\`);
    </script>
    `)

    // 注入环境变量
    html.bodyPrepend.push(`
    <!-- 注入环境变量 -->
    <script>window.__YOUNG_ENV__=${JSON.stringify(config)}</script>
    <!-- 更新检测，每分钟一次 -->
    <script>
    const YOUNG_UPDATE_TIMER = setInterval(() => {
      fetch('${getFullAssetsUrl('/get/env')}')
        .then((res) => res.json())
        .then(({ NUXT_PUBLIC_CURRENT_VERSION }) => {
          if (NUXT_PUBLIC_CURRENT_VERSION !== window.__YOUNG_ENV__.NUXT_PUBLIC_CURRENT_VERSION) {
            clearInterval(YOUNG_UPDATE_TIMER);
            alert('版本已更新，点击重新加载页面！');
            window.location.reload();
          }
        });
    }, 6e4);
    </script>
    `)

    // vconsole 调试
    if ((config as ImportMetaEnv).VITE_VCONSOLE) {
      html.bodyAppend.push(`
      <script src="https://g2021-cdn.laiyouxi.com/image/21Store/admin-img/vconsole.min.js"></script>
      <script>new VConsole()</script>
      `)
    }
  })
})

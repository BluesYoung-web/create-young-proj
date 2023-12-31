/*
 * @Author: zhangyang
 * @Date: 2022-12-30 17:19:42
 * @LastEditTime: 2023-11-10 16:09:24
 * @Description:
 */
import { resolve } from 'node:path'
import { loadConfig } from 'c12'
import { useYoungLogger } from '@bluesyoung/logger'

export default defineNitroPlugin(async (nitroApp) => {
  const env = (process.env.DEPLOY_ENV as 'dev' | 'test' | 'online') || 'dev'
  const { config } = await loadConfig<Record<string, any>>({
    name: env,
    cwd: resolve(process.cwd(), 'config'),
    defaultConfig: {
      // 此处可以放置通用的环境变量
      // 由于频繁修改 package.json 会浪费 docker 性能，故将版本信息放于此处
      // 优先读取环境变量中的版本信息(自己打的 Tag)
      NUXT_PUBLIC_CURRENT_VERSION: process.env.PROJECT_VERSION || 'v0.0.1',

      NUXT_PUBLIC_TITLE: 'XXX-后台管理系统',
      NUXT_PUBLIC_SUB_TITLE: '做XXX我们是认真的！',
      NUXT_PUBLIC_SLOGAN: 'XXXXX, XXXXX',
      NUXT_PUBLIC_LOGIN_BG: '/bg.webp',
      NUXT_PUBLIC_LOGIN_LOGO: '/logo.svg',
    },
  })

  for (const key in config) {
    if (process.env[key]) {
      console.log(
        '系统环境变量优先: ',
        key,
        ' = ',
        process.env[key],
        ' -> ',
        config[key],
        ' -> ',
        '覆盖',
      )
      config[key] = process.env[key]
    }
    else {
      process.env[key] = config[key]
    }
    if (!(key.indexOf('NUXT_PUBLIC_') === 0))
      delete config[key]
  }

  // 仅打包之后格式化日志
  if (process.env.NODE_ENV !== 'development')
    useYoungLogger()

  console.log('------------------------读取配置文件------------------------')
  console.log(config)
  console.log('-------------------------------------------------------------')

  nitroApp.hooks.hook('request', (event) => {
    const headers = event.node.req.headers
    console.log('ua', headers['user-agent'], 'x-forwarded-for', headers['x-forwarded-for'], 'x-real-ip', headers['x-real-ip'])
  })

  nitroApp.hooks.hook('render:html', (html, { event }) => {
    // 设定视口高度，防止软键盘影响布局
    html.bodyPrepend.push(`
    <script>
    const metaElement = document.querySelector('#viewportMeta');
    metaElement.setAttribute('content', \`maximum-scale=1.0,minimum-scale=1.0,user-scalable=0,width=device-width,initial-scale=1.0,height=\${window.innerHeight}\`);
    </script>
    `)

    // 直接注入环境变量到前端
    html.bodyPrepend.push(`
    <!-- 注入环境变量 -->
    <script>window.__YOUNG_ENV__=${JSON.stringify(config)}</script>
    <!-- 更新检测，每分钟一次 -->
    <script>
    const YOUNG_UPDATE_INTERVAL = setInterval(() => {
      fetch('/get/env')
        .then((res) => res.json())
        .then(({ NUXT_PUBLIC_CURRENT_VERSION }) => {
          if (NUXT_PUBLIC_CURRENT_VERSION !== window.__YOUNG_ENV__.NUXT_PUBLIC_CURRENT_VERSION) {
            clearInterval(YOUNG_UPDATE_INTERVAL);
            alert('版本已更新，请重新加载页面！');
            window.location.reload();
          }
        });
    }, 6e4);
    </script>
    `)

    // 移动端调试控制台，需要使用就放开下面的注释
    // if (process.env.NODE_ENV === 'development' || process.env.NUXT_PUBLIC_ENABLE_CONSOLE) {
    //   html.bodyAppend.push(`
    //   <script src="//cdn.bootcdn.net/ajax/libs/eruda/2.3.3/eruda.js"></script>
    //   <script>eruda.init();</script>
    //   `);
    // }
  })
})

/*
 * @Author: zhangyang
 * @Date: 2022-12-30 17:19:42
 * @LastEditTime: 2024-02-02 15:51:14
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
})

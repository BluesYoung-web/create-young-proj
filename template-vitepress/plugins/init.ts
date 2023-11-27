/*
 * @Author: zhangyang
 * @Date: 2023-11-10 18:02:07
 * @LastEditTime: 2023-11-27 15:01:31
 * @Description:
 */
import { resolve } from 'node:path'
import { loadConfig } from 'c12'
import md5 from 'md5'

/**
 * 签名
 * @param params 参与签名的参数
 * @param token 秘钥
 */
export function signFn(params: Record<string, any>, token: string) {
  const asciiSortedIndexArr = Object.keys(params).sort()
  let str = ''
  const obj: Record<string, any> = {}
  if (asciiSortedIndexArr.length > 0) {
    for (const key of asciiSortedIndexArr) {
      const v = params[key]
      if (v !== null && v !== '') {
        str += `${key}=${encodeURIComponent(v)}&`
        obj[key] = v
      }
    }
  }
  str += `token=${token}`
  return {
    sign: md5(str).toUpperCase(),
    rawValue: obj,
  }
}

/**
 * 服务上报
 */
export async function useServerReport(port: number) {
  enum ReportURL {
    上线 = '/register/login',
    心跳 = '/register/heart',
  }

  const commonReq = async <T>(url: string, data: Record<string, any>, token: string) => {
    const api_server_url
      = process.env.NUXT_PUBLIC_API_SERVER || `http://${process.env.APIGATEHOST}`
    const { sign, rawValue } = signFn(data, token)

    console.log('🚀 ~ file: env.ts:41 ~ commonReq ~ api_server_url:', api_server_url, rawValue)

    const headers = {
      'Authorization': `Bearer ${token}`,
      'content-type': 'application/json; charset=utf-8;',
      'time': `${Math.floor(Date.now() / 1000)}`,
      sign,
    }

    return $fetch<T>(`${api_server_url}${url}`, {
      method: 'post',
      headers,
      body: JSON.stringify(rawValue),
    })
  }

  /**
   * auth token
   */
  let token: string

  /**
   * 登录/获取 token
   */
  const login = async () => {
    const data = {
      serverId: process.env.APP_SERVER_ID,
      serverName: process.env.APP_SERVER_NAME,
    }

    const { data: _data } = await commonReq<{
      code: number
      message: string
      data: { token: string }
    }>('/account/v1/internal/service/get_token', data, process.env.APP_SERVER_SECERET as string)

    console.log('🚀 ~ file: env.ts:73 ~ login ~ _data:', _data)

    const { token } = _data
    console.log('login success, token: ', token, '\ntime: ', new Date().toLocaleString())
    return token
  }

  /**
   * 获取 auth token
   */
  const getToken = async () => {
    if (!token) {
      token = await login()
      setInterval(() => {
        // 每 23 小时刷一次 token
        token = ''
      }, 1000 * 3600 * 23)
    }
    return token
  }

  /**
   * 服务上线
   */
  const report = async (url: ReportURL) => {
    const token = await getToken()
    try {
      const res = await commonReq<{
        host: string
        port: string | number
        weight: number
        expire: number
      }>(url, { port }, token)

      console.log('请求成功：', url, new Date().toLocaleString())
      return res
    }
    catch (error) {
      console.error('请求失败：', url, error)
    }
  }

  console.log('------------------------服务登录------------------------')
  await login()
  console.log('--------------------------------------------------------')

  console.log('------------------------服务上线------------------------')
  const info1 = await report(ReportURL.上线)
  console.log('🚀 ~ file: init.ts:156 ~ defineNitroPlugin ~ info', info1)
  console.log('--------------------------------------------------------')

  console.log('------------------------服务心跳上报----------------------')
  const info2 = await report(ReportURL.心跳)
  console.log('🚀 ~ file: init.ts:163 ~ setInterval ~ info', info2)
  console.log('----------------------------------------------------------')
  setInterval(async () => {
    console.log('------------------------服务心跳上报----------------------')
    const info = await report(ReportURL.心跳)
    console.log('🚀 ~ file: init.ts:163 ~ setInterval ~ info', info)
    console.log('----------------------------------------------------------')
  }, 1e4)
}

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

      // 服务秘钥，不对前端开放
      APP_SERVER_SECERET: '我是秘钥',
      APP_SERVER_NAME: '我是服务名称',
      APP_SERVER_ID: '我是服务id',
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

  console.log('------------------------读取配置文件------------------------')
  console.log(config)
  console.log('-------------------------------------------------------------')

  nitroApp.hooks.hook('request', (event) => {
    const headers = event.node.req.headers
    const path = event.node.req.url
    console.log('path', path, 'ua', headers['user-agent'], 'x-forwarded-for', headers['x-forwarded-for'], 'x-real-ip', headers['x-real-ip'])
  })

  // 本地开发，不上报
  if (process.env.NODE_ENV === 'development')
    return

  const port = process.env.LISTEN_PORT || 3333
  useServerReport(+port)
})

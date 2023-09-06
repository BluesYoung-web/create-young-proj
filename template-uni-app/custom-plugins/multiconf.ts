/*
 * @Author: zhangyang
 * @Date: 2023-07-19 14:32:45
 * @LastEditTime: 2023-09-06 19:39:10
 * @Description:
 */
import type { Plugin } from 'vite'
import type { OutputAsset } from 'rollup'

/**
 * 通过传递 mode 以读取不同的环境变量
 */
export function multiConf(env: string) {
  let configEnv: ImportMetaEnv
  return {
    name: 'young-multi-conf',
    enforce: 'post',
    configResolved: async (config) => {
      console.log(`当前使用的环境变量来自于：.env.${env}`, config.env)

      configEnv = config.env as ImportMetaEnv
    },
    generateBundle(options, bundle) {
      const appid = configEnv.VITE_APP_ID
      const json = bundle['project.config.json'] as OutputAsset
      if (json?.source && typeof json.source === 'string') {
        const jsonConf = JSON.parse(json.source)
        // console.log("🚀 ~ file: multiconf.ts:27 ~ generateBundle ~ jsonConf:", jsonConf);

        jsonConf.setting = {
          urlCheck: true,
          coverView: true,
          es6: true,
          postcss: true,
          lazyloadPlaceholderEnable: false,
          preloadBackgroundData: false,
          minified: true,
          autoAudits: false,
          uglifyFileName: false,
          uploadWithSourceMap: true,
          enhance: true,
          showShadowRootInWxmlPanel: true,
          packNpmManually: false,
          packNpmRelationList: [],
          minifyWXSS: true,
          useStaticServer: true,
          showES6CompileOption: false,
          checkInvalidKey: true,
          babelSetting: {
            ignore: [],
            disablePlugins: [],
            outputPath: '',
          },
          disableUseStrict: false,
          useCompilerPlugins: false,
          minifyWXML: true,
          useMultiFrameRuntime: true,
          ignoreUploadUnusedFiles: false,
          ignoreDevUnusedFiles: false,
        }
        jsonConf.appid = appid
        jsonConf.requiredPrivateInfos = ['getLocation']
        jsonConf.permission = {
          'scope.userLocation': {
            desc: '你的位置信息将用于获取附近的门店信息',
          },
        }

        json.source = JSON.stringify(jsonConf, null, 2)
        // console.log("🚀 ~ file: multiconf.ts:72 ~ generateBundle ~ jsonConf:", jsonConf);
      }
    },
  } as Plugin
}

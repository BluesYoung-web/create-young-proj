/*
 * @Author: zhangyang
 * @Date: 2023-07-18 11:03:01
 * @LastEditTime: 2023-11-13 11:46:57
 * @Description:
 */
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import type { ConfigEnv } from 'vite'
import Uni from '@dcloudio/vite-plugin-uni'
import UniPages from '@uni-helper/vite-plugin-uni-pages'
import UniLayouts from '@uni-helper/vite-plugin-uni-layouts'
import UniManifest from '@uni-helper/vite-plugin-uni-manifest'

import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import AutoComponents from 'unplugin-vue-components/vite'
import { multiConf } from './custom-plugins'

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv) => {
  console.log('🚀 ~ file: vite.config.ts:18 ~ mode:', mode)
  console.log('🚀 ~ file: vite.config.ts:18 ~ command:', command)
  return defineConfig({
    resolve: {
      alias: {
        '@/': `${resolve(__dirname, 'src')}/`,
      },
    },
    plugins: [
      // 仅用于增加语法提示，实际导入依靠 uni-app 的 easycom
      AutoComponents({
        dts: true,
        globs: ['src/components/**/*.vue'],
      }),

      // https://uni-helper.js.org/vite-plugin-uni-pages
      UniPages(),
      // https://uni-helper.js.org/vite-plugin-uni-layouts
      UniLayouts(),
      // https://uni-helper.js.org/vite-plugin-uni-manifest
      UniManifest(),
      // hack
      // @ts-expect-error packages.json 中 type: "module" 会造成这里解析的不同
      Uni.default(),
      // https://github.com/antfu/unocss
      Unocss(),

      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        imports: ['vue', 'uni-app', 'pinia'],
        dts: true,
        vueTemplate: true,
        dirs: [
          resolve(__dirname, 'src/apis/**'),
          resolve(__dirname, 'src/config/**'),
          resolve(__dirname, 'src/store/**'),
          resolve(__dirname, 'src/utils/**'),
        ],
      }),

      multiConf(mode),
    ],
  })
}

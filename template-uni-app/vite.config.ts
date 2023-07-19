/*
 * @Author: zhangyang
 * @Date: 2023-07-18 11:03:01
 * @LastEditTime: 2023-07-19 17:50:15
 * @Description:
 */
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import type { ConfigEnv, UserConfigExport } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import Unocss from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import AutoComponents from 'unplugin-vue-components/vite';
import { polyfillFormData, multiConf } from './custom-plugins';

/**
 * 大驼峰转中划线
 */
function camel2kebab(str: string) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
};

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv) => {
  console.log("🚀 ~ file: vite.config.ts:18 ~ mode:", mode)
  console.log("🚀 ~ file: vite.config.ts:18 ~ command:", command)
  return defineConfig({
    resolve: {
      alias: {
        '@/': `${resolve(__dirname, 'src')}/`,
      },
    },
    plugins: [
      polyfillFormData(),
      // 仅用于增加语法提示，实际导入依靠 uni-app 的 easycom
      AutoComponents({
        dts: true,
        globs: ['src/components/**/*.vue'],
        resolvers: [
          (componentName) => {
            if (componentName.startsWith('Uni')) {
              const pkgName = camel2kebab(componentName);
              return { name: 'default', from: `@dcloudio/uni-ui/lib/${pkgName}/${pkgName}.vue` };
            }
          }
        ]
      }),
      uni(),
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
        ]
      }),

      multiConf(mode)
    ],
  });
}

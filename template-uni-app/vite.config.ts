/*
 * @Author: zhangyang
 * @Date: 2023-07-18 11:03:01
 * @LastEditTime: 2023-07-19 11:44:47
 * @Description:
 */
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import Unocss from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import AutoComponents from 'unplugin-vue-components/vite';
import { polyfillFormData } from './custom-plugins';

// https://vitejs.dev/config/
export default defineConfig({
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
      globs: ['src/uni_modules/**/components/**/*.vue', 'src/components/**/*.vue']
    }),
    uni(),
    // https://github.com/antfu/unocss
    Unocss(),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: ['vue', 'uni-app', 'pinia'],
      dts: true,
      vueTemplate: true,
    }),

  ],
});

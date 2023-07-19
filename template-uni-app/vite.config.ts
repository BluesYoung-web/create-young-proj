/*
 * @Author: zhangyang
 * @Date: 2023-07-18 11:03:01
 * @LastEditTime: 2023-07-18 18:02:24
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
    uni(),
    // https://github.com/antfu/unocss
    Unocss(),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: ['vue', 'uni-app', 'pinia'],
      dts: true,
      vueTemplate: true,
    }),
    AutoComponents({
      dts: true,
    }),
  ],
});

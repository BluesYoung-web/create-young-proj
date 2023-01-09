/*
 * @Author: zhangyang
 * @Date: 2022-12-03 15:57:40
 * @LastEditTime: 2023-01-05 14:14:02
 * @Description:
 */
import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import type { ConfigEnv, UserConfigExport } from 'vite';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import legacy from '@vitejs/plugin-legacy';
import Unocss from 'unocss/vite';

// 自动导入
import AutoImport from 'unplugin-auto-import/vite';
import AutoComopnents from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

// 自动路由及布局
import Pages from 'vite-plugin-pages';
import Layouts from 'vite-plugin-vue-layouts';

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  const root = process.cwd();
  const viteEnv = loadEnv(mode, root);
  console.log('🚀 ~ file: vite.config.ts ~ line 36 ~ viteEnv', viteEnv);
  return defineConfig({
    base: './',
    plugins: [
      vue(),
      vueJsx(),
      Pages({
        extensions: ['vue', 'tsx'],
        dirs: 'src/views',
        exclude: ['**/components/*.{vue,tsx}', '_*'],
      }),
      Layouts({ defaultLayout: 'default/index' }),
      AutoComopnents({
        dirs: ['src/components'],
        dts: './src/auto-components.d.ts',
        extensions: ['vue', 'tsx'],
        resolvers: [ElementPlusResolver()],
      }),
      AutoImport({
        dts: './src/auto-imports.d.ts',
        imports: [
          'vue',
          'vue-router',
          '@vueuse/core',
          'pinia',
          {
            'element-plus': ['ElMessage', 'ElMessageBox', 'ElLoadingService'],
          },
        ],
      }),
      Unocss(),
      legacy({
        // 不生成同名 polyfill 文件，打包速度翻倍，如果出现兼容问题，可以删除此配置
        // renderLegacyChunks: false
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      host: true,
      proxy: {
        '/api': 'http://192.168.10.168:3000',
      },
    },
  });
};

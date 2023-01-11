/*
 * @Author: zhangyang
 * @Date: 2023-01-10 14:26:01
 * @LastEditTime: 2023-01-10 15:18:31
 * @Description:
 */
import type { PluginOption } from 'vite';
import { serverPlugin } from './custom-plugin';
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

export { localServer } from './custom-plugin';

export const usePlugins = () => {
  return [
    serverPlugin(),
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
    // 不生成同名 polyfill 文件，打包速度翻倍
    // 如果出现兼容问题，可以删除此配置
    legacy({
      // renderLegacyChunks: false
    }),
  ] as PluginOption[];
};

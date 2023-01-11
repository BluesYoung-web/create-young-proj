/*
 * @Author: zhangyang
 * @Date: 2022-12-03 15:57:40
 * @LastEditTime: 2023-01-10 15:12:20
 * @Description:
 */
import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import type { ConfigEnv, UserConfigExport } from 'vite';
import { usePlugins, localServer } from './build';

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  const root = process.cwd();
  const viteEnv = loadEnv(mode, root);
  console.log('🚀 ~ file: vite.config.ts ~ line 36 ~ viteEnv', viteEnv);
  return defineConfig({
    base: './',
    plugins: usePlugins(),
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      host: true,
      proxy: {
        '/api': localServer,
      },
    },
  });
};

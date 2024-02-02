/*
 * @Author: Leo l024983409@qq.com
 * @Date: 2023-09-19 20:22:55
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-02-02 16:15:07
 * @Description:
 */
import { URL, fileURLToPath } from 'node:url'
import { networkInterfaces } from 'node:os'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Inspect from 'vite-plugin-inspect'
import Unocss from 'unocss/vite'
import legacy from '@vitejs/plugin-legacy'

function getLocalIP() {
  const ips = networkInterfaces()

  for (const name of Object.keys(ips)) {
    const networkInterface = ips[name]
    for (const ip of networkInterface!) {
      if (ip.family === 'IPv4' && !ip.internal)
        return ip.address
    }
  }

  return '127.0.0.1'
}

export default defineConfig({
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: true,
  },
  build: {
    target: ['chrome58'],
    cssTarget: ['chrome58'],
  },
  plugins: [
    (function () {
      const moduleId = 'virtual:local-server'
      const localServer = `http://${getLocalIP()}:3000`
      console.log('🚀 ~ load ~ localServer:', localServer)
      return {
        name: moduleId.split(':')[1],
        resolveId(id: string) {
          if (id === moduleId)
            return moduleId
        },
        load(id: string) {
          if (id === moduleId)

            return `export const server = '${localServer}'`
        },
      }
    })(),

    Vue(),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      extensions: ['vue'],
    }),

    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts(),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        '@vueuse/core',
        'pinia',
      ],
      dts: 'types/auto-imports.d.ts',
      dirs: [
        'src/stores/**',
        'src/modules/**',
        'src/composables/**',
        'src/store/**',
        'src/apis',
        'src/utils/**',
        'src/components/**',
        'src/constants/**',
        'src/enums/**',
      ],
      vueTemplate: true,
    }),

    // https://github.com/antfu/unplugin-vue-components
    Components({
      extensions: ['vue'],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/],
      dts: 'types/components.d.ts',
      resolvers: [(componentName) => {
        if (componentName.startsWith('Dv'))
          return { name: componentName.slice(2), from: '@kjgl77/datav-vue3' }
      },
      ],
      dirs: ['src/components'],
    }),

    // https://github.com/antfu/unocss
    // see uno.config.ts for config
    Unocss(),

    // https://github.com/antfu/vite-plugin-inspect
    // Visit http://localhost:3333/__inspect/ to see the inspector
    Inspect(),

    legacy({ renderLegacyChunks: false }),
  ],
})

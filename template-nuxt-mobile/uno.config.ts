/*
 * @Author: zhangyang
 * @Date: 2022-06-15 08:59:22
 * @LastEditTime: 2023-05-27 19:36:43
 * @Description:
 */
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
  transformers: [
    // 不加 enforce 会有 bug
    transformerDirectives({ enforce: 'pre' }),
    transformerVariantGroup(),
  ],
})

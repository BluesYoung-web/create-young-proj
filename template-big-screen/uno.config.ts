/*
 * @Author: Leo l024983409@qq.com
 * @Date: 2023-09-19 20:22:55
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-02-02 11:11:34
 * @Description:
 */

import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import { Breakpoint } from './src/enums/breakpointEnum'

export default defineConfig({
  shortcuts: [
    ['around', 'flex justify-around items-center'],
    ['between', 'flex justify-between items-center'],
    ['center', 'flex justify-center items-center'],
    ['center-y', 'flex items-center'],
    [
      'btn',
      'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50',
    ],
    [
      'icon-btn',
      'h-30px w-30px transition-all duration-400 dark:h-30px dark:w-30px hover:scale-110  inline-block cursor-pointer select-none transition duration-200 ease-in-out  !outline-none',
    ],
    ['b-bottom', 'border-b-1 border-b-solid border-b-[#eee]'],
    ['switch-animation', 'transition duration-300'],
    ['text', 'text-[#00706c] dark:text-[#fff] switch-animation'],
  ],
  theme: {
    breakpoints: Breakpoint,
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetTypography(),
  ],
  rules: [
    // 多行省略
    [/^line-clamp-(\d+)$/, ([, value]) => handlerLineClamp(value)],
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
// 处理多行省略
function handlerLineClamp(value: any) {
  return {
    'overflow': 'hidden',
    'display': '-webkit-box',
    'word-break': 'break-all',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': `${value}`,
  }
}

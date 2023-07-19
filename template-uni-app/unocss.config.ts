/*
 * @Author: zhangyang
 * @Date: 2023-02-13 14:50:47
 * @LastEditTime: 2023-02-14 12:09:16
 * @Description:
 */
import presetWeapp from 'unocss-preset-weapp';
import { transformerAttributify, transformerClass } from 'unocss-preset-weapp/transformer';
import { defineConfig, transformerDirectives } from 'unocss';

export default defineConfig({
  presets: [
    // https://github.com/MellowCo/unocss-preset-weapp
    presetWeapp(),
  ],
  shortcuts: [
    {
      'flex-center': 'flex justify-center items-center',
    },
  ],
  transformers: [
    transformerDirectives(),

    // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerAttributify
    transformerAttributify(),

    // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerClass
    transformerClass(),
  ],
});

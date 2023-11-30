/*
 * @Author: zhangyang
 * @Date: 2023-11-01 10:13:50
 * @LastEditTime: 2023-11-01 11:11:55
 * @Description:
 */
import antfu from '@antfu/eslint-config'

export default antfu({
  overrides: {
    vue: {
      'vue/valid-v-model': 'off',
    },
    typescript: {
      'ts/no-use-before-define': 'off',
      'ts/no-unused-vars': 'off',
      'ts/ban-types': 'off',
      'ts/ban-ts-comment': 'off',
    },
  },
  rules: {
    'no-console': 'off',
    'node/prefer-global/process': 'off',
    'unused-imports/no-unused-vars': 'off',
    'no-throw-literal': 'off',
    'antfu/consistent-list-newline': 'off',
    'style/jsx-indent': 'off',
  },
}, {
  ignores: [
    'public',
  ],
})

/*
 * @Author: zhangyang
 * @Date: 2023-11-01 10:13:50
 * @LastEditTime: 2023-11-30 11:34:48
 * @Description:
 */
import antfu from '@antfu/eslint-config'

export default antfu({
  overrides: {
    vue: {
      'vue/valid-v-model': 'off',
      'vue/no-unused-refs': 'off',
      'vue/no-lone-template': 'off',
      'vue/valid-attribute-name': 'off',
    },
    typescript: {
      'ts/no-use-before-define': 'off',
      'ts/no-unused-vars': 'off',
      'ts/ban-types': 'off',
      'ts/ban-ts-comment': 'off',
      'ts/no-unnecessary-type-constraint': 'off',
      'import/no-duplicates': 'off',
    },
    jsonc: {
      'jsonc/no-dupe-keys': 'off',
    },
  },
  rules: {
    'no-console': 'off',
    'node/prefer-global/process': 'off',
    'unused-imports/no-unused-vars': 'off',
    'no-throw-literal': 'off',
    'antfu/consistent-list-newline': 'off',
    'style/jsx-indent': 'off',
    'node/handle-callback-err': 'off',
    'no-new': 'off',
    'no-async-promise-executor': 'off',
    'no-alert': 'off',
  },
}, {
  ignores: [
    'public',
    'bun.lockb',
  ],
})

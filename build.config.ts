/*
 * @Author: zhangyang
 * @Date: 2022-12-03 16:46:21
 * @LastEditTime: 2022-12-03 16:46:53
 * @Description:
 */
import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['src/index'],
  clean: true,
  rollup: {
    inlineDependencies: true,
    esbuild: {
      minify: true,
    },
  },
  alias: {
    // we can always use non-transpiled code since we support 14.18.0+
    prompts: 'prompts/lib/index.js',
  },
})

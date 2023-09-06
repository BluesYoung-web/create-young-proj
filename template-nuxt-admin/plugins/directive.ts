/*
 * @Author: zhangyang
 * @Date: 2023-07-31 14:04:44
 * @LastEditTime: 2023-07-31 14:33:10
 * @Description:
 */
import { isString } from '@bluesyoung/utils'

export default defineNuxtPlugin((nuxtApp) => {
  /**
   * 鉴自指令定义的zdy
   */
  nuxtApp.vueApp.directive('permission', {
    mounted(el, binding) {
      const { value } = binding

      if (isString(value) && value) {
        if (!hasPermission(value as unknown as string))
          el.parentNode && el.parentNode.removeChild(el)
      }
      else {
        throw new Error('need value! Like v-permission="\'/access/get/list\'"')
      }
    },
  })
})

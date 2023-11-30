/*
 * @Author: zhangyang
 * @Date: 2023-11-29 17:22:28
 * @LastEditTime: 2023-11-29 17:56:58
 * @Description:
 */
export default defineNuxtRouteMiddleware(async (to, from) => {
  if (to.matched.length === 0)
    throw createError({ message: '页面不存在', statusCode: 404 })

  const { hasLogin } = storeToRefs(useUserStore())
  console.log('🚀 ~ file: auth.global.ts:12 ~ defineNuxtRouteMiddleware ~ hasLogin:', hasLogin.value)

  const changeTitle = () => {
    document.title = (to.meta.title as string) || window.__YOUNG_ENV__.VITE_TITLE
  }

  // 页面无需登录
  if (to.meta.auth === false || hasLogin.value) {
    changeTitle()
    return
  }

  if (!hasLogin.value && to.path !== '/base/login') {
    // 页面需要登录，但是未登录
    showNotify({
      message: '未登录或登录过期，请重新登录',
      type: 'danger',
    })
    return navigateTo(`/base/login?redirect=${encodeURIComponent(to.fullPath)}`, {
      replace: true,
    })
  }
})

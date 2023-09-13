/*
 * @Author: zhangyang
 * @Date: 2023-07-21 10:02:19
 * @LastEditTime: 2023-09-13 09:45:34
 * @Description:
 */
export default defineNuxtRouteMiddleware(async (to, from) => {
  if (to.matched.length === 0)
    throw createError({ message: '页面不存在', statusCode: 404 })

  const { hasLogin } = storeToRefs(useUserStore())
  const { nav_arr, flat_nav_arr, nodeMap, breadcrumb_arr } = storeToRefs(useNavStore())

  const changeTitle = () => {
    let nav = flat_nav_arr.value.find(item => item.component === to.path)

    breadcrumb_arr.value.length = 0

    if (nav && nav.title) {
      to.meta.title = nav.title

      while (nav) {
        breadcrumb_arr.value.unshift(nav.title!)
        if (nav.parent_id)
          nav = nodeMap.value.get(nav.parent_id.toString())
        else
          break
      }
    }

    document.title = (to.meta.title as string) || window.__YOUNG_ENV__.NUXT_PUBLIC_TITLE
  }

  const { addView } = useTagsStore()

  // 页面无需登录
  if (to.meta.auth === false) {
    changeTitle()
    addView(to)
    return
  }

  if (!hasLogin.value && to.path !== '/login') {
    // 页面需要登录，但是未登录
    showNotify({
      type: 'danger',
      message: '未登录或登录过期，请重新登录',
    })
    return navigateTo(`/login?redirect=${encodeURIComponent(to.fullPath)}`, {
      replace: true,
    })
  }
  else if (hasLogin.value && to.path === '/login') {
    // 已登录进入登录页
    return navigateTo('/', {
      replace: true,
    })
  }
  else {
    nav_arr.value.length === 0 && (await generateNavData())
    if (hasPermission(to.path)) {
      changeTitle()
      addView(to)
    }
    else {
      throw createError({ message: '无权限，请联系系统管理员', statusCode: 403 })
    }
  }
})

/*
 * @Author: zhangyang
 * @Date: 2023-06-01 12:03:44
 * @LastEditTime: 2023-11-07 15:50:47
 * @Description:
 */
export const useNavStore = defineStore('useNavStore', () => {
  const title = ref('')
  const sub_title = ref('')
  /**
   * 树形导航数组(仅可见)
   */
  const nav_arr = ref<NavArrItem[]>([])
  /**
   * 拍平之后的导航数组(仅可见，用于快速搜索)
   */
  const flat_nav_arr = ref<NavArrItem[]>([])
  /**
   * 拥有权限的路由
   */
  const auth_routes = ref<string[]>([])

  const breadcrumb_arr = ref<string[]>([])

  /**
   * 生成节点映射
   */
  const nodeMap = ref<Map<string, NavArrItem>>(new Map())
  const generateNodeMap = (list: NavArrItem[]) => {
    for (const node of list) {
      nodeMap.value.set(node.id.toString(), node)
      if (node.children && node.children?.length > 0)
        generateNodeMap(node.children)
    }
  }

  const nav_index_map = ref<Map<string, string>>(new Map())

  const isLoading = ref(false)
  const isCollapse = ref(false)

  watch(
    () => WindowSize['lt-lg'],
    (v) => {
      isCollapse.value = v
    },
    {
      immediate: true,
    },
  )

  watchEffect(() => {
    if (isLoading.value)
      document.body.style.overflow = 'hidden'
    else
      document.body.style.overflow = 'auto'
  })

  /**
   * 工作区全屏控制
   */
  const zen_mode = ref(false)
  /**
   * 工作区全屏时，临时显示顶部导航栏
   */
  const zen_mode_helper = ref(false)
  return {
    title,
    sub_title,
    nav_arr,
    nav_index_map,
    flat_nav_arr,
    auth_routes,
    isLoading,
    isCollapse,
    nodeMap,
    breadcrumb_arr,
    generateNodeMap,
    zen_mode,
    zen_mode_helper,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useNavStore, import.meta.hot))

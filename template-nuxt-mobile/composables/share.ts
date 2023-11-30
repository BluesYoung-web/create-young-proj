/*
 * @Author: zhangyang
 * @Date: 2023-06-25 15:01:47
 * @LastEditTime: 2023-09-27 12:00:49
 * @Description:
 */
export const useShareStore = defineStore('useShareStore', {
  state: () => {
    const jssdkShareSign = ref({
      timestamp: '',
      nonceStr: '',
      signature: '',
    })

    return {
      jssdkShareSign,
    }
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useShareStore, import.meta.hot))

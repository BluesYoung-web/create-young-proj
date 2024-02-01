<!--
 * @Author: zhangyang
 * @Date: 2023-02-13 14:58:26
 * @LastEditTime: 2024-02-01 11:09:23
 * @Description:
-->
<script setup lang="ts">
import { pages } from 'virtual:uni-pages'

onLaunch(async () => {
  console.log('App Launch')
  console.log('环境变量：', import.meta.env)
  const { pagesInfo } = storeToRefs(useSystemInfo())
  pagesInfo.value = pages

  if (!getUuid())
    setUuid()

  await getSystemInfo()

  // #ifdef APP-PLUS
  /**
   * App 热更新
   * 参见：https://ask.dcloud.net.cn/article/35667
   */
  // #endif
})

onShow(async () => {
  // #ifdef MP
  /**
   * 自动更新
   */
  const updateManager = uni.getUpdateManager()

  updateManager.onCheckForUpdate((res) => {
    // 请求完新版本信息的回调
    console.log(res.hasUpdate, 'onCheckForUpdate hasUpdate')
  })

  updateManager.onUpdateReady(() => {
    showModal({
      title: '更新提示',
      content: '新版本已经准备好，是否重启应用？',
      success(res) {
        if (res.confirm) {
          // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
          updateManager.applyUpdate()
        }
      },
    })
  })
  updateManager.onUpdateFailed(() => {
    // 新版本下载失败
    showModal({ title: '更新提示', content: '新版本下载失败', showCancel: false })
  })
  // #endif

  console.log('App Show')
})

onHide(() => {
  console.log('App Hide')
})
</script>

<style lang="scss">
@import '@dcloudio/uni-ui/lib/uni-scss/index.scss';

page {
  background-color: #f6f7fb;
}

.font-pf {
  font-family: PingFangSC-Semibold, PingFang SC;
}

.cancel_scrollbar ::-webkit-scrollbar {
  display: none;
  width: 0 !important;
  height: 0 !important;
  -webkit-appearance: none;
  background: transparent;
}

.button_bg {
  background: linear-gradient(180deg, #3E3A39 0%, #0D0D0D 100%);
}
</style>

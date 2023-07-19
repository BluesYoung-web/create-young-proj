<!--
 * @Author: zhangyang
 * @Date: 2023-02-13 14:58:26
 * @LastEditTime: 2023-07-18 17:57:01
 * @Description:
-->
<script setup lang="ts">
import { getUuid, setUuid } from '@/store';
import { showModal } from '@/utils';
import { getSystemInfo } from '@/utils';

onLaunch(async () => {
  console.log('App Launch');
  if (!getUuid()) {
    setUuid();
  }
  await getSystemInfo();
});

onShow(async () => {
  /**
   * 自动更新
   */
  const updateManager = uni.getUpdateManager();

  updateManager.onCheckForUpdate(function (res) {
    // 请求完新版本信息的回调
    console.log(res.hasUpdate, 'onCheckForUpdate hasUpdate')
  });

  updateManager.onUpdateReady(function () {
    showModal({
      title: '更新提示',
      content: '新版本已经准备好，是否重启应用？',
      success(res) {
        if (res.confirm) {
          // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
          updateManager.applyUpdate()
        }
      }
    });
  });
  updateManager.onUpdateFailed(function () {
    // 新版本下载失败
    showModal({ title: '更新提示', content: '新版本下载失败', showCancel: false });
  });
  console.log('App Show');
});

onHide(() => {
  console.log('App Hide');
});

</script>

<style lang="scss">
@import './uni_modules/uni-scss/index.scss';

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

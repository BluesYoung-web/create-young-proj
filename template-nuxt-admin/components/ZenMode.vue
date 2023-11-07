<!--
 * @Author: zhangyang
 * @Date: 2023-11-07 15:28:35
 * @LastEditTime: 2023-11-07 16:07:52
 * @Description: 工作区全屏切换
-->
<script lang="ts" setup>
const { zen_mode, zen_mode_helper } = storeToRefs(useNavStore())

function toggle() {
  zen_mode.value = !zen_mode.value
  if (zen_mode.value)
    zen_mode_helper.value = false
}
</script>

<template>
  <ElButton circle :title="zen_mode ? '恢复正常布局' : '工作区全屏'" :type="zen_mode ? 'danger' : 'primary'" @click="toggle">
    <div class="i-bi-person-workspace" />
  </ElButton>
</template>

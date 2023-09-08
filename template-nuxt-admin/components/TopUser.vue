<!--
 * @Author: zhangyang
 * @Date: 2023-07-21 16:31:41
 * @LastEditTime: 2023-09-08 10:35:46
 * @Description:
-->
<script lang="ts" setup>
const user = useUserStore()
const { avatar, nick } = storeToRefs(user)

function loginOut() {
  showDialog({
    title: '温馨提示',
    message: '确认退出登录？',
    showCancelButton: true,
  }).then(() => {
    user.removeToken()
    navigateTo(`/login?redirect=${encodeURIComponent(location.href.replace(location.origin, ''))}`)
  }).catch(() => null)
}
</script>

<template>
  <ElDropdown class="avatar-container" trigger="click">
    <div class="inline-flex justify-center items-center mx-2 hover:cursor-pointer">
      <ElAvatar v-if="avatar" :src="avatar" data-not-lazy loading="lazy" />
      <ElAvatar v-else color="transparent">
        <div class="text-xl i-noto-v1-man-technologist-light-skin-tone" />
      </ElAvatar>

      <div class="text-sm ml-2">
        {{ nick }}
      </div>
      <div class="mr-2 text-sm i-ion-md-arrow-dropdown" />
    </div>
    <template #dropdown>
      <ElDropdownMenu class="user-dropdown">
        <ElDropdownItem @click="useChangePassword">
          <div>修改密码</div>
        </ElDropdownItem>
        <ElDropdownItem @click="loginOut">
          <div>退出登录</div>
        </ElDropdownItem>
      </ElDropdownMenu>
    </template>
  </ElDropdown>
</template>

<style scoped lang="scss">
.avatar-dropdown {
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  justify-items: center;
  height: 50px;
  padding: 0;

  .user-avatar {
    width: 40px;
    height: 40px;
    cursor: pointer;
    border-radius: 50%;
  }

  .user-name {
    position: relative;
    margin: 0 6px;
    cursor: pointer;
  }
}
</style>

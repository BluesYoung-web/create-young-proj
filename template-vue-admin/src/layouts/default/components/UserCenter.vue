<!--
 * @Author: zhangyang
 * @Date: 2020-12-10 11:30:30
 * @LastEditTime: 2023-01-05 14:16:52
 * @Description: 顶部导航栏组件
-->
<script lang="ts" setup>
import NavSearch from './NavSearch.vue';
import TopMenu from './TopMenu.vue';
import { useUserStore, useNavStore, removeToken } from '@/stores';

const router = useRouter();
const { CurrUserInfo } = useUserStore();

const loginOut = async () => {
  removeToken();
  useUserStore().reset();
  useNavStore().reset();
  router.replace('/base/login');
};
</script>

<template>
  <!-- 快捷菜单 -->
  <NavSearch />
  <div v-bind="$attrs" class="flex w-full justify-between px-5">
    <!-- 顶部导航栏 -->
    <TopMenu />
    <!-- 右侧个人中心下拉框 -->
    <ElDropdown class="avatar-container" trigger="click">
      <div class="inline-flex justify-center items-center mx-2 hover:cursor-pointer">
        <ElAvatar v-if="CurrUserInfo.avatar" :src="CurrUserInfo.avatar" />
        <ElAvatar v-else color="transparent">
          <div class="text-xl i-noto-v1-man-technologist-light-skin-tone" />
        </ElAvatar>

        <div class="text-sm ml-2">{{ CurrUserInfo.nickname }}</div>
        <div class="mr-2 text-sm i-ion-md-arrow-dropdown" />
      </div>
      <template #dropdown>
        <ElDropdownMenu class="user-dropdown">
          <ElDropdownItem @click="loginOut">
            <div>退出登录</div>
          </ElDropdownItem>
        </ElDropdownMenu>
      </template>
    </ElDropdown>
  </div>
</template>


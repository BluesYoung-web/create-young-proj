<!--
 * @Author: zhangyang
 * @Date: 2023-07-21 12:21:02
 * @LastEditTime: 2023-07-28 16:53:30
 * @Description:
-->
<script lang="ts" setup>
const { isCollapse } = storeToRefs(useNavStore())

const title = window.__YOUNG_ENV__.NUXT_PUBLIC_TITLE
const logo = window.__YOUNG_ENV__.NUXT_PUBLIC_LOGIN_LOGO
</script>

<template>
  <div class="logo-container flex-center">
    <NuxtLink to="/">
      <img class="logo" alt="logo" :src="logo">
      <h1 v-if="!(isCollapse || WindowSize['lt-lg'])" class="title">
        {{ title }}
      </h1>
    </NuxtLink>
  </div>
</template>

<style scoped lang="scss">
.logo-container {
  position: relative;
  display: flex;
  justify-content: center;

  // padding-left: 24px;
  height: 60px;
  overflow: hidden;
  line-height: 60px;
  background: transparent;

  .title {
    display: inline-block;
    margin-left: 12px;
    font-family: Avenir, 'Helvetica Neue', Arial, Helvetica, sans-serif;
    font-size: 20px;
    font-weight: 600;
    color: #fff;
    vertical-align: middle;
  }

  .logo {
    display: inline-block;
    width: 32px;
    height: 32px;
    vertical-align: middle;
  }
}
</style>

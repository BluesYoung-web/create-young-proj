<!--
 * @Author: zhangyang
 * @Date: 2024-02-02 14:55:35
 * @LastEditTime: 2024-02-02 14:56:49
 * @Description:
-->
<template>
  <div>
    <YoungHeader />
    <main px-4 py-10 text="center gray-700 dark:gray-200">
      <RouterView />
      <div mx-auto mt-5 text-center text-sm opacity-50 cursor="pointer" underline @click="$router.back">
        [返回]
      </div>
    </main>
  </div>
</template>

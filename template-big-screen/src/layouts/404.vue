<!--
 * @Author: zhangyang
 * @Date: 2024-02-02 14:16:12
 * @LastEditTime: 2024-02-02 14:16:12
 * @Description:
-->
<template>
  <main p="x4 y10" text="center teal-700 dark:gray-200">
    <div text-4xl>
      <div i-carbon-warning inline-block />
    </div>
    <RouterView />
    <div>
      <button text-sm btn m="3 t8" @click="$router.back()">
        back
      </button>
    </div>
  </main>
</template>

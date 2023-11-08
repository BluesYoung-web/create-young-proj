<!--
 * @Author: zhangyang
 * @Date: 2023-09-27 17:18:12
 * @LastEditTime: 2023-10-19 12:19:30
 * @Description:
-->
<script lang="ts" setup>
const { active_nav, nav_arr } = storeToRefs(useNavStore())

const ShowNavNum = ref(5)

const route = useRoute()
function isActive(nav: NavItem) {
  const navs = nav_arr.value.map(n => n.href)
  return nav.href === route.path || (!navs.includes(route.path) && nav.href === active_nav.value)
}

process.client && watch(() => WindowSize['lt-lg'], (v) => {
  if (v)
    ShowNavNum.value = 4
  else
    ShowNavNum.value = 5
})
</script>

<template>
  <div class="nav ml-83px" lt-md="hidden">
    <ul class="flex">
      <li
        v-for="(nav, index) in nav_arr"
        v-show="index < ShowNavNum"
        :key="`${index}dasjhewr0`"
        class="hover:!text-[#0090ee]"
        :class="{ active: isActive(nav) }"
      >
        <NuxtLink
          :to="nav.href"
          :title="nav.title"
          target="_blank"
        >
          {{ nav.title }}
        </NuxtLink>
        <div v-if="$route.path === nav.href || nav.href === active_nav" class="under" />
      </li>
      <ElPopover v-if="nav_arr.length > ShowNavNum" placement="bottom-end">
        <template #reference>
          <div class="i-ic-twotone-menu text-2xl w-32px" />
        </template>
        <ul class="flex flex-col justify-center text-xl items-center h-full">
          <li
            v-for="(nav, index) in nav_arr.slice(ShowNavNum)" :key="`${index}awfdsjfhalsekjhuye`"
            :class="{ active: isActive(nav) }" class="w-full text-start py-10px"
          >
            <NuxtLink class="hover:font-bold hover:text-[#0090ee]" :title="nav.title" :to="nav.href" target="_blank">
              {{ nav.title }}
            </NuxtLink>
          </li>
        </ul>
      </ElPopover>
    </ul>
  </div>
</template>

<style scoped>
.nav ul li {
  height: 27px;
  font-size: 18px;
  font-family: SourceHanSansSC-Regular, SourceHanSansSC;
  font-weight: 400;
  color: #000000;
  line-height: 27px;
  margin-right: 54px;
  text-align: center;
}

.nav ul .active {
  font-weight: bold;
  color: #0090EE;
}
.nav ul .active .under {
  width: 53px;
  height: 4px;
  background: #0090EE;
  border-radius: 2px;
  margin: 10px auto;
}
</style>

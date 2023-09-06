<!--
 * @Author: zhangyang
 * @Date: 2023-07-21 17:01:21
 * @LastEditTime: 2023-07-28 17:32:46
 * @Description:
-->
<script lang="ts" setup>
import type { SelectOptionItem } from '@bluesyoung/ui-vue3-element-plus'
import { YoungCmdPopup } from '@bluesyoung/ui-vue3'
import { isHttpUrl } from '@bluesyoung/utils'

const { flat_nav_arr, nav_arr } = storeToRefs(useNavStore())

const cmdRef = ref()
const searchStr = ref('')
const options = ref<SelectOptionItem<string>[]>([])

function remoteMethod(query: string) {
  if (query) {
    options.value = flat_nav_arr.value
      .filter(item => +item.visible === 1 && item.title?.toLowerCase().includes(query.toLowerCase()))
      .map(item => ({ label: item.title || '', value: item.component }))
  }
  else {
    options.value = []
  }
}

function goPage(url: string) {
  if (url) {
    if (isHttpUrl(url))
      window.open(url)
    else
      navigateTo(url)

    searchStr.value = ''
    cmdRef.value?.hide()
  }
}
</script>

<template>
  <ElButton v-bind="$attrs" circle title="菜单搜索" @click="cmdRef?.show()">
    <div class="i-ic-baseline-manage-search" />
  </ElButton>

  <YoungCmdPopup ref="cmdRef">
    <template #default="{ el }">
      <div class="flex flex-col items-center">
        <div class="text-xl mb-4">
          快捷菜单搜索：
        </div>
        <ElSelect
          :ref="el" v-model="searchStr" class="w-260px" filterable remote reserve-keyword
          placeholder="请输入菜单关键字，点击选中即可跳转" :remote-method="remoteMethod" @change="goPage"
        >
          <ElOption v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </ElSelect>

        <br>
        <ElTree
          :data="nav_arr" size="large" :props="{
            children: 'children',
            label: 'title',
          }" accordion class="w-full self-start" @node-click="(n: NavArrItem) => goPage(n.component)"
        />
      </div>
    </template>
  </YoungCmdPopup>
</template>

<style lang="scss" scoped>
:deep(.el-tree-node__label) {
  font-size: 16px;
  line-height: 20px;
}
</style>

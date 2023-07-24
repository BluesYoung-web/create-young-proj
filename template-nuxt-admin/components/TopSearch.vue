<!--
 * @Author: zhangyang
 * @Date: 2023-07-21 17:01:21
 * @LastEditTime: 2023-07-24 16:25:53
 * @Description:
-->
<script lang="ts" setup>
import type { SelectOptionItem } from '@bluesyoung/ui-vue3-element-plus';
import { YoungCmdPopup } from '@bluesyoung/ui-vue3';

const { flat_nav_arr } = storeToRefs(useNavStore());

const cmdRef = ref();
const searchStr = ref('');
const options = ref<SelectOptionItem<string>[]>([]);

const remoteMethod = (query: string) => {
  if (query) {
    options.value = flat_nav_arr.value
      .filter((item) => +item.visible === 1 && item.title?.toLowerCase().includes(query.toLowerCase()))
      .map((item) => ({ label: item.title || '', value: item.component }));
  } else {
    options.value = [];
  }
};

const goPage = (url: string) => {
  if (url) {
    navigateTo(url);
    searchStr.value = '';
    cmdRef.value?.hide();
  }
};
</script>

<template>
  <ElButton v-bind="$attrs" circle @click="cmdRef?.show()" title="菜单搜索">
    <div class="i-ic-baseline-manage-search" />
  </ElButton>

  <YoungCmdPopup ref="cmdRef">
    <template #default="{ el }">
      <div class="flex flex-col items-center">
        <div class="text-xl mb-4">
          快捷菜单搜索：
        </div>
        <ElSelect :ref="el" class="w-260px" v-model="searchStr" filterable remote reserve-keyword
          placeholder="请输入菜单关键字，快捷键 Ctrl + K" :remote-method="remoteMethod" @change="goPage">
          <ElOption v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </ElSelect>
      </div>
    </template>
  </YoungCmdPopup>
</template>

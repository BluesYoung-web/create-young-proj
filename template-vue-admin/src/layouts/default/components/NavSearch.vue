<!--
 * @Author: zhangyang
 * @Date: 2022-10-26 10:08:07
 * @LastEditTime: 2023-01-09 10:27:03
 * @Description: 
-->
<script lang="ts" setup>
import type { SelectOptionItem } from '@bluesyoung/ui-vue3-element-plus';
import { YoungCmdPopup } from '@bluesyoung/ui-vue3';
import { useNavStore } from '@/stores';

const { FlatNavArr } = useNavStore();

const options = ref<SelectOptionItem<string>[]>([]);
const searchStr = ref('');
const remoteMethod = (query: string) => {
  if (query) {
    options.value = FlatNavArr.value
      .filter((item) => +item.visible === 1 && item.title?.toLowerCase().includes(query.toLowerCase()))
      .map((item) => ({ label: item.title || '', value: item.component }));
  } else {
    options.value = [];
  }
};

const router = useRouter();

const cmdRef = ref()

const goPage = (url: string) => {
  if (url) {
    router.push(url);
    searchStr.value = '';
    cmdRef.value?.hide()
  }
};
</script>
<template>
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
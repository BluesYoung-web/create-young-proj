<!--
 * @Author: zhangyang
 * @Date: 2023-08-04 17:03:05
 * @LastEditTime: 2023-11-07 14:17:33
 * @Description:
-->
<script lang="ts" setup>
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

const prop = withDefaults(defineProps<{
  modelValue: string
  disabled: boolean
  height?: number
  uploadFn: (file: File) => Promise<string>
}>(), {
  height: 410,
})

const emit = defineEmits<{
  (e: 'update:modelValue', v: string): void
}>()
// 编辑器实例，必须用 shallowRef，重要！
const editorRef = shallowRef()

// 编辑器配置
const editorConfig = {
  placeholder: '请输入内容...',
  MENU_CONF: {
    uploadImage: {
      /**
       * 自定义图片上传
       */
      customUpload: async (file: File, insertFn: Function) => {
        const url = await prop.uploadFn(file)
        insertFn(url)
      },
    },
  },
}

watchEffect(async () => {
  while (!editorRef.value)
    await nextTick()

  if (prop.disabled)
    editorRef.value?.disable()
  else
    editorRef.value?.enable()
})

// 组件销毁时，及时销毁编辑器
onBeforeUnmount(() => {
  editorRef.value?.destroy()
})

const toolbarConfig = {
  excludeKeys: [
    'insertVideo', 'uploadVideo', 'editVideoSize', 'group-video',
  ],
}
</script>

<template>
  <div class="border border-[#ccc]">
    <!-- 工具栏 -->
    <Toolbar :editor="editorRef" :default-config="toolbarConfig" class="border-b border-[#ccc]" />
    <!-- 编辑器 -->
    <Editor
      :model-value="modelValue" :default-config="editorConfig"
      :style="{ height: `${height}px` }" class="overflow-y-auto" :class="{ 'cursor-not-allowed': disabled }"
      @update:model-value="(v) => emit('update:modelValue', v)" @on-created="(v) => editorRef = v"
    />
  </div>
</template>

<style>
.w-e-full-screen-container {
  z-index: 1;
}
</style>

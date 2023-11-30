<!--
 * @Author: zhangyang
 * @Date: 2023-09-28 11:09:14
 * @LastEditTime: 2023-11-29 17:36:42
 * @Description:
-->
<script lang="ts" setup>
import { YoungSlideVerify } from '@bluesyoung/ui-vue3'
import { useVerifyCode } from '@bluesyoung/ui-vue3-element-plus'

interface Props {
  modelValue: string
  tel: string
  maxlength?: number
  forceEl?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  maxlength: 6,
  forceEl: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', v: string): void
  (e: 'enter'): void
}>()

const canGet = computed(() => {
  return props.tel.length === 11
})

const {
  getCode,
  tip,
  showSlider,
  pass,
  cancel,
  disabled,
} = useVerifyCode(async () => {
  apis.get.sendCode(props.tel)
  showNotify({
    message: '短信已发送至您的手机，请注意查收！',
    type: 'success',
  })
})
</script>

<template>
  <div class="w-full">
    <VanField
      v-bind="$attrs"
      class="mt-4 rounded-md" :model-value="modelValue" type="text" placeholder="请输入验证码"
      @update:model-value="(e) => emit('update:modelValue', e)" @keyup.enter="emit('enter')"
    >
      <template #button>
        <VanButton v-if="!disabled" type="primary" class="!text-[#1AAADA]" :disabled="!canGet" plain @click="getCode">
          {{ tip }}
        </VanButton>
        <div v-else class="text-[#ccc]">
          {{ tip }}
        </div>
      </template>
    </VanField>
    <YoungSlideVerify :show="showSlider" @success="pass" @close="cancel" />
  </div>
</template>

<style>
.vue-puzzle-vcode {
  z-index: 10001 !important;
}
</style>

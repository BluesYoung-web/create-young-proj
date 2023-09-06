<!--
 * @Author: zhangyang
 * @Date: 2022-08-19 13:52:58
 * @LastEditTime: 2023-07-24 11:57:12
 * @Description:
-->
<script lang="ts" setup>
import { YoungSlideVerify } from '@bluesyoung/ui-vue3'
import { useVerifyCode } from '@bluesyoung/ui-vue3-element-plus'
import { isNumber } from '@bluesyoung/utils'

interface Props {
  modelValue: string
  tel: string
  maxlength?: number
}

const props = withDefaults(defineProps<Props>(), {
  maxlength: 6,
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
} = useVerifyCode(async () => {
  await apis.get.sendCode(props.tel)
  ElMessage.success('短信已发送至您的手机，请注意查收！')
})
</script>

<template>
  <div class="w-full">
    <ElInput
      :model-value="modelValue" :maxlength="maxlength" class="!h-52px"
      placeholder="请输入验证码" @update:model-value="(e) => emit('update:modelValue', e)" @keyup.enter="emit('enter')"
    >
      <template #suffix>
        <ElLink v-if="isNumber(+tip)" type="primary" :disabled="!canGet" :underline="false" @click="getCode">
          {{ tip }}
        </ElLink>
        <div v-else>
          {{ tip }}
        </div>
      </template>
    </ElInput>
    <YoungSlideVerify :show="showSlider" @success="pass" @close="cancel" />
  </div>
</template>

<style>
.vue-puzzle-vcode {
  z-index: 10001 !important;
}
</style>

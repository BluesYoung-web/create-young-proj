<!--
 * @Author: zhangyang
 * @Date: 2023-07-24 14:21:55
 * @LastEditTime: 2023-09-08 10:34:56
 * @Description:
-->
<script lang="ts" setup>
import { isMobile } from '@bluesyoung/utils'
import type { FormInstance } from 'element-plus'

interface Props {
  onDestroy?: Function
}

const props = withDefaults(defineProps<Props>(), {
  onDestroy: () => console.log('为了节省性能，此时应该销毁dom'),
})

const showPopup = ref(false)

function show() {
  showPopup.value = true
}

function hide() {
  showPopup.value = false
  props.onDestroy()
}

const form = reactive<LoginForm>({
  mobile: '',
  vercode: '',
  password: '',
})

const user = useUserStore()

const formRef = ref<FormInstance>()
function sure() {
  formRef.value?.validate(async (valid) => {
    if (valid) {
      await apis.post.changePassword(form)
      hide()
      showNotify({
        message: '密码修改成功，请重新登录',
        type: 'success',
      })
      user.removeToken()
      const redirect = location.pathname === '/login' ? '/' : encodeURIComponent(location.href.replace(location.origin, ''))
      navigateTo(`/login?redirect=${redirect}`)
    }
  })
}

defineExpose({
  show,
})
</script>

<template>
  <ElDialog v-model="showPopup" title="修改密码" :before-close="hide" width="430px" lt-sm="!w-[96%]">
    <template #default>
      <ElForm ref="formRef" :model="form">
        <ElFormItem
          prop="mobile" :rules="[
            { required: true, trigger: 'blur', message: '请输入手机号' },
            { message: '请输入合法的手机号', trigger: 'blur', validator: (_: any, v: string) => isMobile(v) },
          ]" class="mt-20px"
        >
          <ElInput v-model.trim="form.mobile" placeholder="请输入手机号" maxlength="11" class="!h-52px" clearable />
        </ElFormItem>
        <ElFormItem prop="vercode" :rules="[{ required: true, trigger: 'blur', message: '请输入验证码' }]">
          <YoungCodeInput v-model.trim="form.vercode" :tel="form.mobile" />
        </ElFormItem>
        <ElFormItem
          prop="password" :rules="[
            { required: true, trigger: 'blur', message: '请输入密码' },
            { min: 8, max: 16, trigger: 'blur', message: '请输入8-16位字符！' },
          ]"
        >
          <ElInput
            v-model.trim="form.password" type="password" minlength="8" maxlength="16" placeholder="请输入密码"
            class="!h-52px" clearable show-password @keyup.enter="sure"
          />
        </ElFormItem>
      </ElForm>
    </template>
    <template #footer>
      <ElButton @click="hide">
        取消
      </ElButton>
      <ElButton type="primary" @click="sure">
        确认
      </ElButton>
    </template>
  </ElDialog>
</template>

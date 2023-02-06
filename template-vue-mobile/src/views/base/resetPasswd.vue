<!--
 * @Author: zhangyang
 * @Date: 2021-09-09 12:07:27
 * @LastEditTime: 2023-01-13 16:50:21
 * @Description: 重置密码 | 修改密码
-->
<route lang="yaml">
meta:
  title: 用户登录
  layout: blank
</route>

<script lang="ts" setup>
import { isMobile } from '@bluesyoung/utils';
import { useVerifyCode } from '@/hooks/useVerifyCode';
import type { FormInstance } from 'vant';
import { router } from '@/modules/1-router';

const { countDown, isClicked, sendClick } = useVerifyCode();
const formRef = ref<FormInstance>();

const form = ref({
  tel: '',
  code: '',
  passwd: '',
  passwd_again: ''
});
const validPasswd = () => {
  const { passwd: p1, passwd_again: p2 } = form.value;
  return p1 === p2;
};
const [showPass1, toggle1] = useToggle(false);
const [showPass2, toggle2] = useToggle(false);
const sure = async () => {
  try {
    await formRef.value?.validate();
    // todo: 修改密码，移除登录信息
    // await mod_passwd(form.value);
    showToast('修改成功，请重新登录！');
    // removeToken();
    router.push('/base/login');
  } catch (error) {
    return;
  }
};

</script>
<template>
  <VanNavBar title="重置密码" safe-area-inset-bottom @click-left="$router.back()" />
  <div v-bind="$attrs" class="w-full h-full mt-10">
    <VanForm ref="formRef">
      <VanCellGroup inset>
        <VanField v-model.trim="form.tel" placeholder="手机号" :rules="[
          { required: true, message: '请填写手机号' },
          { validator: isMobile, message: '请输入合法的手机号' }
        ]" />
        <VanField v-model.trim="form.code" placeholder="验证码" :rules="[{ required: true, message: '请填写验证码' }]">
          <template #button>
            <VanButton v-if="!isClicked" :disabled="!isMobile(form.tel)" size="small" type="primary" plain
              @click="sendClick">发送验证码</VanButton>
            <VanButton v-else size="small" :disabled="true">
              {{ countDown.current.value.seconds }}秒后重发
            </VanButton>
          </template>
        </VanField>
        <VanField v-model.trim="form.passwd" placeholder="输入新密码" :type="showPass1 ? 'text' : 'password'" clearable
          :rules="[{ required: true, message: '请填写新密码' }]">
          <template #right-icon>
            <VanIcon :name="showPass1 ? 'eye' : 'closed-eye'" @click="toggle1(!showPass1)" />
          </template>
        </VanField>
        <VanField v-model.trim="form.passwd_again" placeholder="再次确认新密码" :type="showPass2 ? 'text' : 'password'" :rules="[
          { required: true, message: '请确认新密码' },
          { validator: validPasswd, message: '两次输入的密码不一致' }
        ]">
          <template #right-icon>
            <VanIcon :name="showPass2 ? 'eye' : 'closed-eye'" @click="toggle2(!showPass2)" />
          </template>
        </VanField>
      </VanCellGroup>
      <div class="m-4">
        <VanButton block type="primary" @click="sure">
          确定
        </VanButton>
      </div>
    </VanForm>
  </div>
</template>

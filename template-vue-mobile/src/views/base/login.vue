<!--
 * @Author: zhangyang
 * @Date: 2023-01-13 16:18:47
 * @LastEditTime: 2023-01-13 16:51:15
 * @Description: 
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
const formRef = ref<FormInstance>();
const router = useRouter();
const route = useRoute();
const isPass = ref(true);
const form = ref({ tel: '', passwd: '' });
const { countDown, isClicked, sendClick } = useVerifyCode();
const isReaded = ref(true);
const showPopup = ref(false);
const popupContent = ref(`<h1>我是用户协议</h1>`);
const read = (type: 0 | 1) => {
  if (type === 0) {
    popupContent.value = `<h1>我是用户协议</h1>`;
  } else {
    popupContent.value = `<h1>我是隐私政策</h1>`;
  }
  showPopup.value = true;
};
const [showPass, toggle] = useToggle(false);

watch(() => isPass.value, () => form.value.passwd = '');

const loginHandler = async () => {
  try {
    await formRef.value?.validate();
    if (!isReaded.value) {
      showToast('请先同意服务协议！');
      return;
    }
    // todo: 登录
    // const data = await login(form.value);
    const data = true;
    if (data) {
      // todo: change login state
      // setToken(data as unknown as UserKey);
      // await generateUserInfo();
      if (route.query.redirect) {
        router.push({ path: route.query.redirect as string });
      } else {
        router.push('/');
      }
    }
  } catch (error) {
    return;
  }
}
</script>

<template>
  <VanNavBar title="登录" safe-area-inset-bottom />
  <div v-bind="$attrs" class="w-full h-full mt-10">
    <VanForm ref="formRef">
      <VanCellGroup inset>
        <VanField v-model.trim="form.tel" placeholder="手机号" :rules="[
          { required: true, message: '请填写手机号' },
          { validator: isMobile, message: '请输入合法的手机号' }
        ]" />
        <VanField v-if="isPass" v-model.trim="form.passwd" placeholder="密码" :type="showPass ? 'password' : 'text'"
          :rules="[{ required: true, message: '请填写密码' }]">
          <template #right-icon>
            <VanIcon :name="!showPass ? 'eye' : 'closed-eye'" @click="toggle(!showPass)" />
          </template>
        </VanField>
        <VanField v-else v-model.trim="form.passwd" placeholder="验证码" :rules="[{ required: true, message: '请填写验证码' }]">
          <template #button>
            <VanButton v-if="!isClicked" :disabled="!isMobile(form.tel)" size="small" type="primary" plain
              @click="sendClick">发送验证码</VanButton>
            <VanButton v-else size="small" :disabled="true">
              {{ countDown.current.value.seconds }}秒后重发
            </VanButton>
          </template>
        </VanField>
      </VanCellGroup>
      <VanCheckbox v-model="isReaded" shape="square" icon-size="small" class="p-4">
        我已阅读并同意
        <a class=" text-purple-500" @click.prevent="read(0)">用户协议</a>
        与
        <a class=" text-purple-500" @click.prevent="read(1)">隐私政策</a>
      </VanCheckbox>
      <div class="m-4">
        <VanButton block type="primary" @click="loginHandler">
          登录
        </VanButton>
      </div>
      <div class="flex justify-between p-4">
        <a v-if="isPass" class="text-purple-500" @click.prevent="isPass = false">短信登录</a>
        <a v-if="isPass" class="text-purple-500" @click.prevent="$router.push('/base/resetPasswd')">找回密码</a>
        <a v-else class="text-purple-500" @click.prevent="isPass = true">密码登录</a>
      </div>
    </VanForm>
    <VanPopup v-model:show="showPopup" position="center" :style="{ height: '80%', width: '90%', overflow: 'auto' }">
      <div v-html="popupContent" />
    </VanPopup>
  </div>
</template>
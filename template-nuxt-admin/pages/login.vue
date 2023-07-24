<!--
 * @Author: zhangyang
 * @Date: 2023-07-21 10:03:11
 * @LastEditTime: 2023-07-24 15:01:48
 * @Description:
-->
<script lang="ts" setup>
import { isMobile } from '@bluesyoung/utils';
import type { FormInstance } from 'element-plus';

definePageMeta({
  auth: false,
  title: '用户登录',
  noCache: true,
  layout: 'blank'
});

const {
  NUXT_PUBLIC_LOGIN_LOGO: LoginLogo,
  NUXT_PUBLIC_LOGIN_BG: LoginBg,
  NUXT_PUBLIC_TITLE: Title,
  NUXT_PUBLIC_SUB_TITLE: SubTitle,
  NUXT_PUBLIC_SLOGAN: SloGan,
  NUXT_PUBLIC_CURRENT_VERSION: Version
} = window.__YOUNG_ENV__;

const { SaveFlag, hasLogin, cookie } = storeToRefs(useUserStore());

const loginType = ref<'account' | 'code'>('account');

const form = reactive<LoginForm>({
  mobile: '',
  vercode: '',
  password: '',
});

const formRef = ref<FormInstance>();

const loginHandler = () => {
  formRef.value?.validate(async (valid: boolean) => {
    try {
      if (valid) {
        const { enter } = useFullscreen();
        const { width, height } = useWindowSize();

        const data = await apis.post.login(form);
        if (data) {
          cookie.value = data;
          height.value > width.value && enter();
          await generateNavData();
          showSuccessToast('登录成功！');
          navigateTo('/');
        }
      } else {
        ElMessage.error('请仔细检查输入内容');
        return;
      }
    } catch (error) {
      console.error(error);
    }
  });
};

onMounted(() => {
  if (SaveFlag.value && hasLogin.value) {
    navigateTo({
      path: '/',
      replace: true
    });
  }
});
</script>

<template>
  <img :src="LoginBg" class="absolute object-center object-cover w-100vw h-100vh blur-6 brightness-50" />
  <div class="flex flex-col items-center login-container pt-6%">
    <div class="w-80px h-80px">
      <img class="h-full" :src="LoginLogo" referrerpolicy="no-referrer" />
    </div>
    <div class="title">{{ Title }}</div>
    <div v-if="SubTitle" v-html="SubTitle" class="sub-title" />

    <ElCard class="w-430px mt-3%" lt-sm="w-[96%] mx-[2%]">
      <ElForm ref="formRef" :model="form">
        <VanTabs v-model:active="loginType" size="large" @change="formRef?.resetFields?.()">
          <VanTab name="account" title="账密登录">
            <ElFormItem prop="mobile" :rules="[
              { required: true, trigger: 'blur', message: '请输入手机号' },
              { message: '请输入合法的手机号', trigger: 'blur', validator: (_: any, v: string) => isMobile(v) }
            ]" class="mt-20px">
              <ElInput v-model="form.mobile" placeholder="请输入手机号" maxlength="11" class="!h-52px" clearable />
            </ElFormItem>
            <ElFormItem v-if="loginType === 'account'" prop="password" :rules="[
              { required: true, trigger: 'blur', message: '请输入密码' },
              { min: 8, max: 16, trigger: 'blur', message: '请输入8-16位字符！' }
            ]">
              <ElInput type="password" v-model="form.password" minlength="8" maxlength="16" placeholder="请输入密码"
                class="!h-52px" clearable show-password @keyup.enter="loginHandler" />
            </ElFormItem>
          </VanTab>
          <VanTab name="code" title="短信登录">
            <ElFormItem prop="mobile" :rules="[
              { required: true, trigger: 'blur', message: '请输入手机号' },
              { message: '请输入合法的手机号', trigger: 'blur', validator: (_: any, v: string) => isMobile(v) }
            ]" class="mt-20px">
              <ElInput v-model="form.mobile" placeholder="请输入手机号" maxlength="11" class="!h-52px" clearable />
            </ElFormItem>
            <ElFormItem v-if="loginType === 'code'" prop="vercode"
              :rules="[{ required: true, trigger: 'blur', message: '请输入验证码' }]">
              <YoungCodeInput v-model="form.vercode" :tel="form.mobile" @enter="loginHandler" />
            </ElFormItem>
          </VanTab>
        </VanTabs>

        <ElFormItem>
          <div class="flex justify-between w-full">
            <ElCheckbox v-model="SaveFlag">三天之内免登录</ElCheckbox>
            <ElButton v-show="loginType === 'account'" type="warning" @click="useChangePassword" link>忘记密码？</ElButton>
          </div>
        </ElFormItem>
      </ElForm>

      <VanButton type="primary" class="w-full" @click="loginHandler">
        登录
      </VanButton>
    </ElCard>

    <div v-if="SloGan" class="slogan">
      {{ SloGan }}
    </div>
    <div class="content-wrapper">
      <div class="mb-5% text-[#c0c0c0] text-16px">{{ Version }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@-webkit-keyframes left-to-right {
  from {
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
  }

  to {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
}

@keyframes left-to-right {
  from {
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
  }

  to {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
}

.login-container {
  @apply relative overflow-hidden h-100vh w-full;

  .title {
    @apply mt-10px text-[#fff] text-24px font-bold;
  }

  .sub-title {
    @apply mt-10px text-[#f5f5f5] text-16px mb-30px;
  }

  .slogan {
    @apply flex flex-1 justify-center items-center text-[#fff] font-500 text-26px text-shadow;
    -webkit-animation: left-to-right 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    animation: left-to-right 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
}
</style>


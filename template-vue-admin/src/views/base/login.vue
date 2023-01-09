<!--
 * @Author: zhangyang
 * @Date: 2023-01-04 12:08:08
 * @LastEditTime: 2023-01-09 09:38:39
 * @Description: 
-->
<route lang="yaml">
meta:
  layout: blank
</route>

<script lang="ts" setup>
import { setToken } from '@/stores';
import { generateNavData } from '@/modules/4-auth';
import { apis } from '@/modules/3-net';

const title = window.__YOUNG_VITE_ENV__.VITE_TITLE || '管理后台';

type LoginType = 'code' | 'scan';
const loginType = ref<LoginType>('code');
const changeType = () => {
  if (loginType.value === 'code') {
    loginType.value = 'scan';
  } else {
    loginType.value = 'code';
  }
};

const formRef = ref();
const form = reactive({
  username: '',
  password: ''
});
const rules = {
  username: [{ required: true, trigger: 'blur', message: '请输入帐户名' }],
  password: [{ required: true, trigger: 'blur', message: '请输入密码' }]
};

/**
 * 路由器实例，负责改变路由
 */
const router = useRouter();
const loginHandler = () => {
  formRef.value?.validate(async (valid: boolean) => {
    try {
      if (valid) {
        const data = await apis.post.login(form);
        if (data) {
          setToken(data);
          await generateNavData();
          router.push('/');
        }
      } else {
        ElMessage.error('请仔细检查表单内容');
        return;
      }
    } catch (error) {
      console.error(error);
    }
  });
};

const start = () => {
  ElMessage.success('敬请期待！');
};
</script>
<template>
  <div class="login-main">
    <div class="logo flex justify-center items-center pl-12 pt-4">
    </div>
    <div class="mx-auto flex justify-center flex-col items-center">
      <div class="text-3xl mb-7">{{ title }}</div>
      <div class="form">
        <ElCard>
          <template #header>
            <span v-show="loginType === 'scan'">{{ '扫码登录' }}</span>
            <span v-show="loginType === 'code'">{{ '密码登录' }}</span>
            <div class="icon-container" @click="changeType">
              <svg v-show="loginType === 'scan'" title="账号密码登录" t="1646619966567" class="icon" viewBox="0 0 1076 1024"
                version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2882" width="200" height="200">
                <path
                  d="M986.22796 0H90.275175A90.275175 90.275175 0 0 0 0 90.086315v634.570269a90.275175 90.275175 0 0 0 90.275175 90.275175h291.411288l-51.369975 152.410181H226.632239a28.32903 28.32903 0 0 0 0 56.65806h623.238657a28.32903 28.32903 0 0 0 0-56.65806h-103.495389l-51.369974-152.410181h291.222427A90.275175 90.275175 0 0 0 1076.503135 724.845444V90.086315A90.275175 90.275175 0 0 0 986.22796 0z m0 56.65806A33.617115 33.617115 0 0 1 1019.845076 90.086315V623.238657H56.65806V90.086315A33.617115 33.617115 0 0 1 90.275175 56.65806zM389.996311 967.34194l51.369975-152.410181h193.770564l51.369974 152.410181z m287.822944-209.06824H90.275175A33.617115 33.617115 0 0 1 56.65806 724.845444V679.896717h963.187016v45.704168a33.617115 33.617115 0 0 1-33.428256 33.617116z"
                  p-id="2883"></path>
              </svg>
              <svg v-show="loginType === 'code'" t="1646619725486" viewBox="0 0 1024 1024" version="1.1" class="icon"
                xmlns="http://www.w3.org/2000/svg" p-id="2043" width="200" height="200">
                <path
                  d="M384 554.666667a85.333333 85.333333 0 0 1 85.333333 85.333333v234.666667a85.333333 85.333333 0 0 1-85.333333 85.333333H149.333333a85.333333 85.333333 0 0 1-85.333333-85.333333V640a85.333333 85.333333 0 0 1 85.333333-85.333333h234.666667z m226.133333 277.333333c4.693333 0 8.533333 3.84 8.533334 8.533333V896h183.466666c4.693333 0 8.533333 3.84 8.533334 8.533333v46.933334a8.533333 8.533333 0 0 1-8.533334 8.533333H563.2a8.533333 8.533333 0 0 1-8.533333-8.533333v-110.933334c0-4.693333 3.84-8.533333 8.533333-8.533333h46.933333z m341.333334 0c4.693333 0 8.533333 3.84 8.533333 8.533333v110.933334a8.533333 8.533333 0 0 1-8.533333 8.533333h-46.933334a8.533333 8.533333 0 0 1-8.533333-8.533333v-110.933334c0-4.693333 3.84-8.533333 8.533333-8.533333h46.933334zM384 618.666667H149.333333a21.333333 21.333333 0 0 0-21.184 18.837333L128 640v234.666667a21.333333 21.333333 0 0 0 18.837333 21.184L149.333333 896h234.666667a21.333333 21.333333 0 0 0 21.184-18.837333L405.333333 874.666667V640a21.333333 21.333333 0 0 0-18.837333-21.184L384 618.666667z m418.133333 149.333333c4.693333 0 8.533333 3.84 8.533334 8.533333v46.933334a8.533333 8.533333 0 0 1-8.533334 8.533333h-46.933333a8.533333 8.533333 0 0 1-8.533333-8.533333v-46.933334c0-4.693333 3.84-8.533333 8.533333-8.533333h46.933333zM298.666667 704a21.333333 21.333333 0 0 1 21.333333 21.333333v64a21.333333 21.333333 0 0 1-21.333333 21.333334h-64a21.333333 21.333333 0 0 1-21.333334-21.333334v-64a21.333333 21.333333 0 0 1 21.333334-21.333333h64z m503.466666-149.333333c4.693333 0 8.533333 3.84 8.533334 8.533333v46.933333a8.533333 8.533333 0 0 1-8.533334 8.533334H618.666667v64h119.466666c4.693333 0 8.533333 3.84 8.533334 8.533333v46.933333a8.533333 8.533333 0 0 1-8.533334 8.533334h-174.933333a8.533333 8.533333 0 0 1-8.533333-8.533334v-174.933333c0-4.693333 3.84-8.533333 8.533333-8.533333h238.933333z m149.333334 128c4.693333 0 8.533333 3.84 8.533333 8.533333v46.933333a8.533333 8.533333 0 0 1-8.533333 8.533334h-132.266667a8.533333 8.533333 0 0 1-8.533333-8.533334v-46.933333c0-4.693333 3.84-8.533333 8.533333-8.533333h132.266667z m0-128c4.693333 0 8.533333 3.84 8.533333 8.533333v46.933333a8.533333 8.533333 0 0 1-8.533333 8.533334h-46.933334a8.533333 8.533333 0 0 1-8.533333-8.533334v-46.933333c0-4.693333 3.84-8.533333 8.533333-8.533333h46.933334zM384 64a85.333333 85.333333 0 0 1 85.333333 85.333333v234.666667a85.333333 85.333333 0 0 1-85.333333 85.333333H149.333333a85.333333 85.333333 0 0 1-85.333333-85.333333V149.333333a85.333333 85.333333 0 0 1 85.333333-85.333333h234.666667z m490.666667 0a85.333333 85.333333 0 0 1 85.333333 85.333333v234.666667a85.333333 85.333333 0 0 1-85.333333 85.333333H640a85.333333 85.333333 0 0 1-85.333333-85.333333V149.333333a85.333333 85.333333 0 0 1 85.333333-85.333333h234.666667zM384 128H149.333333a21.333333 21.333333 0 0 0-21.184 18.837333L128 149.333333v234.666667a21.333333 21.333333 0 0 0 18.837333 21.184L149.333333 405.333333h234.666667a21.333333 21.333333 0 0 0 21.184-18.837333L405.333333 384V149.333333a21.333333 21.333333 0 0 0-18.837333-21.184L384 128z m490.666667 0H640a21.333333 21.333333 0 0 0-21.184 18.837333L618.666667 149.333333v234.666667a21.333333 21.333333 0 0 0 18.837333 21.184L640 405.333333h234.666667a21.333333 21.333333 0 0 0 21.184-18.837333L896 384V149.333333a21.333333 21.333333 0 0 0-18.837333-21.184L874.666667 128z m-576 85.333333a21.333333 21.333333 0 0 1 21.333333 21.333334v64a21.333333 21.333333 0 0 1-21.333333 21.333333h-64a21.333333 21.333333 0 0 1-21.333334-21.333333v-64a21.333333 21.333333 0 0 1 21.333334-21.333334h64z m490.666666 0a21.333333 21.333333 0 0 1 21.333334 21.333334v64a21.333333 21.333333 0 0 1-21.333334 21.333333h-64a21.333333 21.333333 0 0 1-21.333333-21.333333v-64a21.333333 21.333333 0 0 1 21.333333-21.333334h64z"
                  fill="#333333" p-id="2044"></path>
              </svg>
            </div>
          </template>
          <div v-show="loginType === 'scan'">
            <div class="text-center m-20px">
              <ElButton type="primary" size="large" class="len" @click="start">钉钉扫码登录</ElButton>
            </div>
            <div class="w-384px text-center text-[#f56c6c]">首次登录请联系系统管理员开通权限</div>
          </div>
          <div class="code" v-show="loginType === 'code'">
            <ElForm ref="formRef" :model="form" :rules="rules" @keyup.enter="loginHandler">
              <ElFormItem prop="username">
                <ElInput v-model.trim="form.username" size="large" placeholder="请输入用户名" tabindex="1" auto-complete="on"
                  clearable class="len" />
              </ElFormItem>
              <ElFormItem prop="password">
                <ElInput v-model.trim="form.password" size="large" placeholder="请输入密码" tabindex="2" auto-complete="on"
                  type="password" clearable show-password class="len" />
              </ElFormItem>
            </ElForm>
            <ElButton type="primary" size="large" class="len" @click="loginHandler">登 录</ElButton>
          </div>
        </ElCard>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-main {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  background-image: url('@/assets/img/login_background.jpg');
  background-repeat: norepeat;
  background-size: cover;
  position: relative;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  .logo {
    position: absolute;
    left: 0;
    top: 0;
  }

  .title {
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: 2.1rem;
    text-align: center;
  }

  .form {
    $iw: 1.5rem;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    .icon {
      width: $iw;
      height: $iw;
      position: absolute;
      right: 0;
      top: 0;
      margin: 0.5rem;

      &:hover {
        cursor: pointer;
      }

    }


    .code {
      padding: 4rem 1rem;

      .len {
        width: 20rem;
        margin-bottom: 0.3rem;
      }
    }

    .img-btn {
      width: 168px;
      height: 28px;
      display: flex;
      justify-content: center;
      align-items: center;

      #img-zx {
        height: 5rem;
        margin-top: 0.5rem;
      }

      #img-zc {
        height: 2rem;
      }
    }
  }
}
</style>

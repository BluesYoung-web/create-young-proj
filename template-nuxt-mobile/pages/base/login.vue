<!--
 * @Author: zhangyang
 * @Date: 2023-11-29 16:30:21
 * @LastEditTime: 2023-11-30 09:41:00
 * @Description:
-->
<script lang="ts" setup>
import { isMobile } from '@bluesyoung/utils'
import type { FormInstance } from 'vant'

definePageMeta({
  title: '登录',
  layout: 'blank',
  auth: false,
})

const formRef = ref<FormInstance>()
const router = useRouter()
const route = useRoute()
const isPass = ref(true)
const form = ref<LoginForm>({ tel: '', passwd: '' })

const isReaded = ref(true)
const showPopup = ref(false)
const popupContent = ref(`<h1>我是用户协议</h1>`)

enum ProtoType {
  用户协议,
  隐私政策,
}

function read(type: ProtoType) {
  if (type === ProtoType.用户协议)
    popupContent.value = `<h1>我是用户协议</h1>`

  else
    popupContent.value = `<h1>我是隐私政策</h1>`

  showPopup.value = true
}
const [showPass, toggle] = useToggle(false)

watch(() => isPass.value, () => form.value.passwd = '')

const { cookie, Exptime, hasLogin } = storeToRefs(useUserStore())

async function loginHandler() {
  try {
    await formRef.value?.validate()
    if (!isReaded.value) {
      showToast('请先同意服务协议！')
      return
    }
    const data = await apis.post.login(form.value)
    console.log('🚀 ~ file: login.vue:55 ~ loginHandler ~ data:', data)
    if (data) {
      cookie.value = data
      // 三天后过期
      Exptime.value = Date.now() + 1000 * 60 * 60 * 24 * 3
      showSuccessToast('登录成功！')

      nextTick(() => {
        if (route.query.redirect)
          navigateTo({ path: route.query.redirect as string })
        else
          navigateTo('/')
      })
    }
  }
  catch (error) {

  }
}

onMounted(() => {
  hasLogin.value && navigateTo('/', {
    replace: true,
  })
})
</script>

<template>
  <VanNavBar title="登录" safe-area-inset-bottom />
  <div v-bind="$attrs" class="w-full h-full mt-10">
    <VanForm ref="formRef">
      <VanCellGroup inset>
        <VanField
          v-model.trim="form.tel" maxlength="11" placeholder="手机号" :rules="[
            { required: true, message: '请填写手机号' },
            { validator: isMobile, message: '请输入合法的手机号' },
          ]"
        />
        <VanField
          v-if="isPass" v-model.trim="form.passwd" placeholder="密码" :type="showPass ? 'password' : 'text'"
          :rules="[{ required: true, message: '请填写密码' }]"
        >
          <template #right-icon>
            <VanIcon :name="!showPass ? 'eye' : 'closed-eye'" @click="toggle(!showPass)" />
          </template>
        </VanField>
        <YoungCodeInput v-else v-model.trim="form.passwd" :tel="form.tel" placeholder="验证码" :rules="[{ required: true, message: '请填写验证码' }]" />
      </VanCellGroup>
      <VanCheckbox v-model="isReaded" shape="square" icon-size="small" class="p-4">
        我已阅读并同意
        <span class=" text-purple-500" @click.prevent="read(ProtoType.用户协议)">用户协议</span>
        与
        <span class=" text-purple-500" @click.prevent="read(ProtoType.隐私政策)">隐私政策</span>
      </VanCheckbox>
      <div class="m-4">
        <VanButton block type="primary" @click="loginHandler">
          登录
        </VanButton>
      </div>
      <div class="flex justify-between p-4">
        <span v-if="isPass" class="text-purple-500 cursor-pointer" @click.prevent="isPass = false">短信登录</span>
        <span v-if="isPass" class="text-purple-500 cursor-pointer" @click.prevent="$router.push('/base/resetPasswd')">找回密码</span>
        <span v-else class="text-purple-500 cursor-pointer" @click.prevent="isPass = true">密码登录</span>
      </div>
    </VanForm>
    <VanPopup v-model:show="showPopup" position="center" :style="{ height: '80%', width: '90%', overflow: 'auto' }">
      <div v-html="popupContent" />
    </VanPopup>
  </div>
</template>

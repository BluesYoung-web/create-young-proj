/*
 * @Author: zhangyang
 * @Date: 2023-11-29 17:28:36
 * @LastEditTime: 2023-11-29 17:39:37
 * @Description:
 */
interface UserLoginRes {
  uuid: string
  nickname: string
  headimgurl: string
  token: string
}

interface LoginForm {
  tel: string
  passwd: string
}

interface ResetPasswdForm extends LoginForm {
  code: string
  passwd_again
}

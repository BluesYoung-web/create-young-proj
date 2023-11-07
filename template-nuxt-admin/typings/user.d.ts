/*
 * @Author: zhangyang
 * @Date: 2023-07-21 08:58:31
 * @LastEditTime: 2023-07-24 10:36:06
 * @Description:
 */
interface UserLoginRes {
  uuid: string
  nickname: string
  headimgurl: string
  phone: string
  token: string
}

interface LoginForm {
  mobile: string
  password: string
  vercode: string
}

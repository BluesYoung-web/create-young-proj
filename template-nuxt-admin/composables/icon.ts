/*
 * @Author: zhangyang
 * @Date: 2023-07-21 15:20:01
 * @LastEditTime: 2023-11-07 14:48:21
 * @Description:
 * @unocss-include
 */
export const MenuIcons = [
  'i-icon-park-solid-analysis',
  'i-ant-design-account-book-outlined',
  'i-ant-design-bulb-outlined',
  'i-icon-park-solid-application',
  'i-icon-park-solid-apple-one',
  'i-icon-park-solid-align-text-right-one',
  'i-icon-park-solid-auto-focus',
  'i-humbleicons-crown',
  'i-icon-park-solid-add-user',
  'i-typcn-device-desktop',
  'i-icon-park-solid-application-two',
] as const

export const MenuIconList: SelectOptionItem[] = MenuIcons.map(label => ({
  label,
  value: label,
}))

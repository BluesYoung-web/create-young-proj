# 从现有模板快速创建工程

[![](https://img.shields.io/badge/Author-BluesYoung--web-blue)](https://gitee.com/BluesYoung-web) [![npm](https://img.shields.io/npm/v/create-young-proj)](https://www.npmjs.com/package/create-young-proj)

[![code style](https://antfu.me/badge-code-style.svg)](https://github.com/antfu/eslint-config)


```bash
# 推荐，每次都执行最新的版本
npx create-young-proj@latest

# 会优先执行本地的，本地没有再去拉取线上的
npm create young-proj
yarn create young-proj
pnpm create young-proj
```

🚧 WIP

- [x] template-vue-thin
- [x] template-nuxt-admin
- [x] template-admin-server
- [x] template-vue-mobile
- [x] template-uni-app
- [x] template-nuxt3-website
- [x] template-vitepress
- [x] template-big-screen

## template-nuxt-admin

管理后台，基于 `nuxt3` 开发，完整性更高，开发体验及用户体验都更好

与 `template-admin-server` 配套使用

## template-nuxt-website

官网，基于 `nuxt3` 开发，完整性更高，开发体验及用户体验都更好

完善的响应式支持，PC/移动端自适应

`ssr`，完善的 `seo`

## template-uni-app

通用小程序模板，基于 `Vue3` + `uni-app` 开发，[详见](./template-uni-app/README.md)

## template-vue-mobile

移动端模板，在 `template-vue-thin` 的基础上加入 `vant4` 开发

目前测试过的最低兼容为 支付宝/钉钉 内置浏览器(`Chrome69`)

## template-vue-thin

极简 `Vue-TS` 工程，无 `UI` 框架

自带 `polyfill`

`Pinia` 状态管理

`Unocss` 样式自动生成

`API` 自动导入，组件自动导入

基于文件目录的自动路由

## template-admin-server

后端服务程序，基于 [midwayjs](https://www.midwayjs.org/) 开发

## template-vitepress

基于 [vitepress](https://vitepress.dev/) 开发，附带基本的汉化配置及部署相关的脚本

## template-big-screen

大屏模板，[详见](./template-big-screen/README.md)
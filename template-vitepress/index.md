---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: 前端知识库
  text: 知识共建，共创未来
  tagline: 多种实用工具，满足不同需求
  image:
    src: https://api.iconify.design/noto:rocket.svg?color=%2312b2e7&width=320
  actions:
    - theme: brand
      text: 快速开始
      link: /newer
    - theme: alt
      text: 前端规范
      link: /standards
    - theme: alt
      text: 常见问题及解决方案
      link: /problems

features:
  - title: '@bluesyoung/ui-vue3-element-plus'
    icon: <span class="i-ep-element-plus text-[#409eff]"></span>
    details: 基于 element-plus 二次封装的常用组件库
    link: /libs/public/ui-vue3-element-plus

  - title: '@bluesyoung/http'
    icon: <span class="i-logos-lighttpd"></span>
    details: 基于 axios 封装的 http 请求库, 拥有完善的 TS 类型提示, 支持 web/微信小程序
    link: /libs/public/http

  - title: '@bluesyoung/utils'
    icon: <span class="i-tabler-tools text-[#409eff]"></span>
    details: 常用工具函数
    link: https://gitee.com/-/ide/project/BluesYoung-web/young/edit/master/-/packages/utils/dist/index.d.ts

  - title: '@bluesyoung/logger'
    icon: <span class="i-vscode-icons-file-type-log"></span>
    details: 基于 consola 封装的日志工具, 默认格式化为容器部署要求的格式, 并保留了扩充能力
    link: /libs/public/logger
  
  - title: '@bluesyoung/rpc'
    icon: <span class="i-simple-icons-trpc text-[#409eff]"></span>
    details: 页面与其嵌套的 iframe 或由其打开的子页面之间进行通信
    link: /libs/public/rpc

  - title: '@bluesyoung/ui-vue3'
    icon: <span class="i-logos-vue"></span>
    details: 基于 vue3 + @vueuse/core 封装的组件，无额外的依赖
    link: /libs/public/ui-vue3
---


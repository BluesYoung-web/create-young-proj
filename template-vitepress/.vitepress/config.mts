/*
 * @Author: zhangyang
 * @Date: 2023-11-08 15:46:58
 * @LastEditTime: 2023-11-27 11:18:38
 * @Description:
 */
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: '前端知识库',
  description: '多种实用工具，满足不同需求',
  lang: 'zh-CN',
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh',
    }
  },
  base: '/wlb/fe/',
  lastUpdated: true,
  themeConfig: {
    search: {
      provider: 'local',
      options: {
        detailedView: true,
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            displayDetails: '显示详细信息',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        },
      }
    },

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '快速开始', link: '/newer' },
      { text: '通用知识', link: '/common/dev-env', activeMatch: '^/common/' },
    ],

    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },

    outline: {
      label: '本页目录',
    },

    lastUpdatedText: '最后更新时间',

    sidebarMenuLabel: '菜单',

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-PRESENT BluesYoung-web',
    },

    sidebar: {
      '/': [
        {
          text: '快速开始',
          items: [
            { text: '新人必读', link: '/newer' },
            { text: '前端规范', link: '/standards' },
            { text: '常见问题及解决方案', link: '/problems' },
          ]
        },
        {
          text: '通用知识',
          base: '/common/',
          items: [
            { text: '1. 开发环境', link: 'dev-env' },
            { text: '2. 开发必备知识点', link: 'basic-knowledge' },
            { text: '3. 常用 vite 插件', link: 'vite-plugin' },
          ]
        },
        {
          text: '项目脚手架与模板介绍',
          base: '/templates/',
          items: [
            { text: '1. 使用方法', link: 'how-to-use' },
            { text: '2. template-nuxt-admin', link: 'nuxt-admin' },
            { text: '3. template-nuxt-website', link: 'nuxt-website' },
            { text: '4. template-uni-app', link: 'uni-app' },
            { text: '5. template-vue-thin', link: 'vue-thin' },
            { text: '6. template-vue-mobile', link: 'vue-mobile' },
            { text: '7. template-admin-server', link: 'admin-server' },
          ]
        },
        {
          text: '项目部署',
          items: [
            { text: '使用 Docker 部署项目', link: '/common/project-deploy' },
          ]
        },
      ],
      '/libs/': [
        {
          text: '开源',
          base: '/libs/public/',
          items: [
            { text: 'ui-vue3-element-plus', link: 'ui-vue3-element-plus' },
            { text: 'http', link: 'http' },
            { text: 'logger', link: 'logger' },
            { text: 'rpc', link: 'rpc' },
            { text: 'ui-vue3', link: 'ui-vue3' },
          ],
          collapsed: true
        },
        {
          text: '内部',
          base: '/libs/private/',
          items: [
            { text: '来游戏平台-通行证 JSSDK', link: 'lyx-js-sdk' },
            { text: '悬浮球', link: 'young-float-ball' },
          ]
        }
      ],
    },

    socialLinks: [
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" width="1.09em" height="1em" viewBox="0 0 256 236"><path fill="#E24329" d="m128.075 236.075l47.104-144.97H80.97l47.104 144.97Z"/><path fill="#FC6D26" d="M128.075 236.074L80.97 91.104H14.956l113.119 144.97Z"/><path fill="#FCA326" d="M14.956 91.104L.642 135.16a9.752 9.752 0 0 0 3.542 10.903l123.891 90.012l-113.12-144.97Z"/><path fill="#E24329" d="M14.956 91.105H80.97L52.601 3.79c-1.46-4.493-7.816-4.492-9.275 0l-28.37 87.315Z"/><path fill="#FC6D26" d="m128.075 236.074l47.104-144.97h66.015l-113.12 144.97Z"/><path fill="#FCA326" d="m241.194 91.104l14.314 44.056a9.752 9.752 0 0 1-3.543 10.903l-123.89 90.012l113.119-144.97Z"/><path fill="#E24329" d="M241.194 91.105h-66.015l28.37-87.315c1.46-4.493 7.816-4.492 9.275 0l28.37 87.315Z"/></svg>'
        },
        link: 'gitlab仓库的完整地址',
      },
    ],

    editLink: {
      pattern: 'https://gitlab地址/-/ide/project/此处换成仓库的具体路径/edit/master/-/:path',
      text: '在 gitlab 上编辑此页'
    }
  },
  head: [
    ['link', { rel: 'icon', href: 'https://api.iconify.design/noto:rocket.svg?color=%2312b2e7' }]
  ],
  markdown: {
    container: {
      tipLabel: '提示',
      warningLabel: '注意',
      dangerLabel: '警告',
      detailsLabel: '详细信息',
      infoLabel: '信息',
    }
  },
})

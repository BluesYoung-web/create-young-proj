# 基于 uni-app + vue3 + ts + pinia + unocss 的小程序模板

## Feature

- 🚀 `Vue3` + `TS` 快速开发，类型友好，将 🐛 扼杀在摇篮之中

- 💄 `unocss` 样式自动生成, 无需手写样式

- 🛠️ `pinia` 状态管理, 简单易用

- 📦 自动按需导入组件和 `API`, 减少冗余代码, 自定义的组件和方法亦可自动导入
  
  - 方法自动导入，基于 [unplugin-auto-import](https://www.npmjs.com/package/unplugin-auto-import)
  - 组件自动导入，基于 `uni-app` 的 [easycom](https://uniapp.dcloud.net.cn/collocation/pages.html#easycom)
  - `ts` 类型提示：

    - `@uni-helper/uni-app-types` 提供 `uni-app` 组件类型
    - `@uni-helper/uni-ui-types` 提供 `uni-ui` 组件类型

- 🛠️ 支持通过传递不同的 `mode` 值以使用不同的配置

- 🚀 约定优于配置，基于文件目录的路由：
  
  - 根据页面文件自动生成 `pages.json`
  - [官方文档](https://www.npmjs.com/package/@uni-helper/vite-plugin-uni-pages)

## 接口编写

> 按需注入特定的类型，以实现完美的类型推导和自动完成

推荐用法，参见：

  - [api 编写](./src/apis/index.ts)
    - [get 请求](./src/apis/requests/get.ts)
    - [post 请求](./src/apis/requests/post.ts)

  - [api 使用](./src/pages/index.vue)

  - [原始 npm 包](https://www.npmjs.com/package/@bluesyoung/http)

## 特定环境的配置读取

1. 按需修改 `package.json -> scripts`

```bash
# 方式一
"test": "npm run dev:mp-weixin -- --mode=test"

# 方式二
"test": "uni -p mp-weixin --mode=test"
```

2. 创建对应的 `.env.{mode}` 文件

3. 代码中使用 `import.meta.env.{变量名}` 直接读取使用
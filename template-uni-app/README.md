# 基于 uni-app + vue3 + ts + pinia + unocss 的小程序模板


[![](https://img.shields.io/badge/Author-BluesYoung--web-blue)](https://gitee.com/BluesYoung-web)

[![code style](https://antfu.me/badge-code-style.svg)](https://github.com/antfu/eslint-config)

## 配套 git 提交工具

### 安装

```bash
npm i -g young-commit
```

### 使用

- 正常使用 `git add` 将要提交的文件添加到暂存区

- 提交步骤使用 `yc` 或者 `young-commit` 进行提交

#### 命令选项

- `yc -i` 初始化(仅刚创建项目时使用，会自动执行 `git init`)

- `yc -r` 进行版本发布，会根据之前的提交及最近一个 `tag` 生成 `changelog`

## Feature

- 🚀 `Vue3` + `TS` 快速开发，类型友好，将 🐛 扼杀在摇篮之中

- 💄 `unocss` 样式自动生成, 无需手写样式

- 🛠️ `pinia` 状态管理, 简单易用

- 📦 自动按需导入组件和 `API`, 减少冗余代码, 自定义的组件和方法亦可自动导入
  
  - 方法自动导入，基于 [unplugin-auto-import](https://www.npmjs.com/package/unplugin-auto-import)
  - 组件自动导入，基于 `uni-app` 的 [easycom](https://uniapp.dcloud.net.cn/collocation/pages.html#easycom)
  - `ts` 类型提示：

    - `@uni-helper/uni-app-types` 提供 `uni-app` 组件类型提示
    - `@uni-helper/uni-ui-types` 提供 `uni-ui` 组件类型提示

- 🛠️ 支持通过传递不同的 `mode` 值以使用不同的配置

- 🚀 约定优于配置，基于文件目录的路由：
  
  - 根据页面文件自动生成 `pages.json`
  - [官方文档](https://www.npmjs.com/package/@uni-helper/vite-plugin-uni-pages)

- 🚀 可定制布局框架

  - 根据页面的配置，自动注册并导入对应的组件，可将一些全局组件丢入布局之中，避免频繁导入
  - 可以在布局内部进行登录校验，避免各个页面频繁调用
  - [官方文档](https://www.npmjs.com/package/@uni-helper/vite-plugin-uni-layouts)


### 针对 `uni-app` 的改进

> 使用 `pages.config.ts` 和 `manifest.config.ts` 替代原有的 `json` 配置，增强了类型提示与配置合法性校验

**`pages.json` 和 `manifest.json` 现在是由插件自动生成，尽量不要手动修改，以免造成意外的 `bug`**


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
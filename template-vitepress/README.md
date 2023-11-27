# template-vitepress

[![](https://img.shields.io/badge/Author-BluesYoung--web-blue)](https://gitee.com/BluesYoung-web)

## 本地运行

::: code-group
```bash [yarn]
# 装依赖
yarn
# 运行
yarn dev
```
```bash [pnpm]
# 装依赖
pnpm i
# 运行
pnpm dev
```
```bash [bun]
# 装依赖
bun i
# 运行
bun dev
```
```bash [npm]
# 装依赖
npm i
# 运行
npm run dev
```
:::

## 到手之后需要自行调整的内容

### `.vitepress/config.mts`

<TodoItem>seo 相关<code ml-1>title, description</code></TodoItem>

:::danger
<TodoItem>部署相关<code ml-1>base</code></TodoItem>

- 根路径部署就删掉，否则为部署的路径，**必须以 `/` 结尾**

- [官方文档](https://vitepress.dev/reference/site-config#base)
:::

<TodoItem><a href="https://vitepress.dev/reference/default-theme-nav" target="_blank">顶部导航</a> <code ml-1>themeConfig -> nav</code></TodoItem>

<TodoItem><a href="https://vitepress.dev/reference/default-theme-sidebar" target="_blank">侧边栏导航</a> <code ml-1>themeConfig -> sidebar</code></TodoItem>

<TodoItem>替换仓库地址 <code ml-1>themeConfig -> socialLinks -> link</code></TodoItem>

<TodoItem>替换仓库地址 <code ml-1>themeConfig -> editLink -> pattern</code></TodoItem>

### `index.md`

<TodoItem>标题及描述 <code ml-1>hero -> [name, text, tagline]</code></TodoItem>

<TodoItem>快捷导航 <code ml-1>hero -> actions</code></TodoItem>

<TodoItem>特性介绍 <code ml-1>features</code></TodoItem>

### 首页贡献者

`.vitepress/components/HomePage.vue -> teamMembers` 按需修改

:::info
如果不需要展示，将 `.vitepress/theme/index.ts -> 'home-features-after'` 这一行注释即可
:::

## 文档书写

### 简介

标题：`使用 # 符号表示标题，数量代表标题级别。例如：# 一级标题、## 二级标题`

段落和换行：`段落之间使用空行分隔，要插入换行符，可以在行末添加两个空格`

强调：`使用 * 或 _ 包围文本来斜体显示，使用两个 * 或 _ 包围文本来加粗显示。例如：*斜体文本*、**加粗文本**`

列表：`使用 *、+ 或 - 开头创建无序列表，使用数字后跟句点创建有序列表。嵌套列表时缩进四个空格或一个制表符`

链接：`使用 [显示文本](链接地址) 的格式创建链接。例如：[OpenAI](https://openai.com)`

图片：`使用 ![替代文本](图片链接地址) 的格式插入图片。例如：![Logo](https://example.com/logo.png)`

引用块：`使用 > 表示引用块。可以嵌套使用多个 > 表示多层引用`

代码块：`使用三个反引号 ```` 或四个空格缩进来创建代码块。可以指定语言以进行语法高亮`

水平线：`使用三个或更多连续的 -、* 或 _ 创建水平线分隔线`

转义字符：`在特殊字符前添加反斜杠 \ 可以转义字符的原始含义`

### 外部教程

[vitepress 扩展语法](https://vitepress.dev/guide/markdown)

[基础语法](https://www.markdownguide.org/basic-syntax/)

[中文技术文档的写作规范——阮一峰](https://github.com/ruanyf/document-style-guide)
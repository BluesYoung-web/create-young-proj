# 基于 Nuxt 3 的后台

[![code style](https://antfu.me/badge-code-style.svg)](https://github.com/antfu/eslint-config)

## 与旧版的区别

### 所有的页面都是默认缓存的

- 原有的 route 代码块，使用 definePageMeta 宏进行定义

- 所有需要 keep-alive 的页面，setup 里面直接执行的函数或者 onMounted 包裹的函数，全部替换为 useTabReOpen 进行包裹

- 所有不需要 keep-alive 的页面，setup 里面直接执行的函数或者 onMounted 包裹的函数，全部替换为 useTabNoCache 进行包裹

- onUnmounted 包裹的函数，全部替换为 useTabClose 进行包裹

### 组件库(@bluesyoung/ui-vue3-element-plus)

> 自 0.13.0 开始，YoungDialog 默认表现为 Drawer !!!, 可通过设置 as='dialog' 改为 Dialog

### 其他

- 路由跳转，使用 navigateTo 替换 router

- 二次确认弹窗，统一使用 useConfirm(自带汉化，代码更精简)

- prompt 情况更复杂，需自行汉化

- alert 使用频率不高，自行汉化

- 使用 tsx 代替 h:
  - hooks 直接修改扩展名为 .tsx
  - vue 内修改 lang 为 tsx

- stores/* 已经被删除了，需要取数据，使用 pinia

- 一些存在于 keep-alive 页面内的组件，需要在例如 @focus 内 getList()，或者使用 useTabReOpen 替换 onMounted

- 尽量使用 YoungTablePro 而不是 YoungTable

- 保持页面美观，页面内容全部使用 ElCard 进行包裹

- **SelectOption 的值不要给 null ！！！**

- **所有非原生的标签，统一使用大驼峰书写**

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

## ⚠️ 注意

接口需要传递数组数据的，需要序列化为逗号拼接的字符串之后再传递！！！

## 使用响应式布局

兼容 `PC` 端与移动端

**移动端最低兼容钉钉浏览器**

## 常用的操作

### 抛出错误

```ts
throw createError({ statusCode: 404, message: '数据迷路了' })
```

### 响应式屏幕尺寸


```ts
/*
export const WindowSize = reactive({
  'lt-sm': useMediaQuery('(max-width: 639.9px)'),
  'sm': useMediaQuery('(min-width: 640px)'),
  'lt-md': useMediaQuery('(max-width: 767.9px)'),
  'md': useMediaQuery('(min-width: 768px)'),
  'lt-lg': useMediaQuery('(max-width: 1023.9px)'),
  'lg': useMediaQuery('(min-width: 1024px)'),
  'lt-xl': useMediaQuery('(max-width: 1279.9px)'),
  'xl': useMediaQuery('(min-width: 1280px)'),
  'lt-2xl': useMediaQuery('(max-width: 1535.9px)'),
  '2xl': useMediaQuery('(min-width: 1536px)'),
});
*/
```
# 基于 Nuxt 3 的后台

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

> **受限于 Nuxt3 的 keep-alive 机制，setup 直接执行 / onMounted 包裹的，需要替换为 useTabReOpen 包裹的**

## 使用响应式布局

兼容 `PC` 端与移动端

**移动端最低兼容钉钉浏览器**

## 常用的操作

### 抛出错误

```ts
throw createError({ statusCode: 404, message: '数据迷路了' });
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
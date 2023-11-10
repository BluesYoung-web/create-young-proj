# 基于 Nuxt 3 的服务端渲染响应式网站


[![](https://img.shields.io/badge/Author-BluesYoung--web-blue)](https://gitee.com/BluesYoung-web)

[![code style](https://antfu.me/badge-code-style.svg)](https://github.com/antfu/eslint-config)

## 注意

> `useFetch + $fetch + NuxtLink + navigateTo` 组合使用，可以极大提升用户体验

```ts
navigateTo('/url?a=1&b=2')
// ===>
navigateTo({
  path: '/url',
  query: {
    a: 1,
    b: 2
  }
})
```

> `definePageMeta` 的 `name` 不得重复

### 图片大小

**`asstes` 内的图片不得大于 4k**，超过大小的图片需要转换为 `webp` 后上传至 `cdn`

### 接口缓存基准时间

开发时可以修改 `nuxt.config.ts -> runtimeConfig -> public -> cacheTime` 的值

部署时调整 `boot.mjs` 中 `NUXT_PUBLIC_CACHE_TIME` 的默认值

**系统环境变量 `NUXT_PUBLIC_CACHE_TIME` 优先级最高！！！**

## 特性

- 基于 [@nuxtjs/device](https://github.com/nuxt-modules/device) 的设备判断

- 基于 [@unocss/nuxt](https://github.com/unocss/unocss) 的样式自动生成

- 基于 [@formkit/auto-animate](https://auto-animate.formkit.com/#usage-vue) 的自动动画

- 基于 [@bluesyoung/nuxt3-lazy-load](https://www.npmjs.com/package/@bluesyoung/nuxt3-lazy-load) 的图片懒加载

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

### 设备判断

```ts
const $device = useDevice()

$device.isDesktop
$device.isMobile
$device.isTablet
$device.isMobileOrTablet
$device.isDesktopOrTablet
$device.isIos
$device.isWindows
$device.isMacOS
$device.isApple
$device.isAndroid
$device.isFirefox
$device.isEdge
$device.isChrome
$device.isSafari
$device.isSamsung
$device.isCrawler
```
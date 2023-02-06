# h5 模板

## 用户代码片段(页面模板)

模板 | 触发关键字
--- | ---
基础页面 | `base`

## **Docker 部署**

- 同一份代码，可以根据运行时的环境变量决定具体表现
- `node` 服务：
  - 托管前端静态资源
  - 根据环境变量读取对应的配置文件，并以接口的形式暴露给前端
  - 跨域接口代理

环境变量

```sh
# 部署环境 dev | test | online
DEPLOY_ENV=dev
# DEPLOY_ENV=test
# DEPLOY_ENV=online
# node 服务监听的端口号
LISTEN_PORT=3000
```

### 本地开发

**确保上述的环境变量存在**

启动服务端程序 `yarn dev:server`

启动客户端程序 `yarn dev`

### 打包预览

`yarn build`

**确保上述的环境变量存在！！！**

`node boot.mjs`

### 配置文件

存放于 `config` 目录下的 `.${env}rc` 文件，`env` 为对应的环境标识

## 常规部署

- `nginx` 托管前端静态资源
- 每次打包时读取环境变量，打包完成之后不可变
- 使用 `nginx` 代理跨域

环境变量

```sh
# 设置静态部署
VITE_USE_DEFAULT_DEPLOY_METHOD=true
# 其他的环境变量，根据环境区分
VITE_TITLE=标题名称
```

### 本地开发

**确保上述的环境变量存在**，然后 `yarn dev` 即可

### 打包预览

`yarn build`

`yarn preview`
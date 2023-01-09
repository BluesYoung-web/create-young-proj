# 基于 midway 的 node 服务端程序

## 快速入门

<!-- 在此次添加使用文档 -->

如需进一步了解，参见 [midway 文档](https://midwayjs.org)。

## 前置操作

### 开发

1. 参考 [配置文件(可根据实际情况修改)](src/config/config.default.ts) 手动创建对应的数据库

2. 临时在 [jwt 中间件](src/middleware/jwt.middleware.ts) 解除初始化接口的鉴权

3. 调用初始化接口，调用成功之后恢复上一步中的代码

### 生产

**执行 `SQL` 语句，进行数据库/数据表的创建及注入初始数据**

## 环境变量

```bash
# 监听端口号
LISTEN_PORT=7001
# 指定使用环境
NODE_ENV=production
```

## 本地开发

```bash
# 依赖安装
yarn
# 本地调试
yarn dev
# 代码格式化
yarn format
# 打包
yarn build
# 启动打包后的代码
yarn start
```

## 基本流程

### 设计表结构

[TypeORM 文档](https://typeorm.io/)

[参考](src/entities/Api.ts)

### Service(直接操作数据库)

编写对应的 `Service`, 实现基础的增删改查

[参考](src/service/api.service.ts)

### Controller(实现具体接口)

调用 `Service`，实现具体接口

[路由定义及参数获取](https://www.midwayjs.org/docs/controller#%E8%B7%AF%E7%94%B1)

[接口参数校验](https://www.midwayjs.org/docs/extensions/validate#%E5%AE%9A%E4%B9%89%E6%A3%80%E6%9F%A5%E8%A7%84%E5%88%99)

[参考](src/controller/api.controller.ts)

### **注意**

**除了 [jwt 中间件](src/middleware/jwt.middleware.ts) 白名单指定的接口之外，其余所有接口全部会进行 `jwt` 鉴权**

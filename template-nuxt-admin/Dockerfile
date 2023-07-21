# 拉取基础镜像
FROM intranet-harbor.laiyouxi.com/base/alpine/node:19 as builder
# 添加部分元数据，暂无意义
LABEL vendor="Lyx-yunwei" \
      com.example.release-date="2022-11-10" \
      com.example.version.is-production="false"

# 维护者
MAINTAINER BluesYoung "bluesyoung_web@163.com"
# 配置环境变量
ENV WORK_DIR=/app

# 工作目录
WORKDIR /app

# 没有压缩包，首选 COPY，如果需要自动解包或下载，则使用 ADD

# 对比依赖是否变更
COPY package.json yarn.lock /app/

# 设置npm仓库 + 下载依赖，上面的文件如果没有变化则跳过下载，直接使用缓存
RUN npm config set registry https://registry.npmmirror.com && \
    yarn config set registry https://registry.npmmirror.com && \        
    yarn

# 加入代码
COPY . /app
# 打包
RUN yarn build

# 打包完成，构建最终的极简镜像
FROM intranet-harbor.laiyouxi.com/base/alpine/node:19

WORKDIR /app
# 复制源码
COPY boot.mjs /app/
COPY config /app/config
# 复制编译后的代码
COPY --from=builder /app/dist /app/dist

ENTRYPOINT ["node", "boot.mjs"]

# Stage 1: Build stage
FROM node:20-alpine AS builder
RUN corepack enable && corepack prepare pnpm@latest --activate

# 设置时区（可选，确保日志和时间相关功能正常）
RUN apk add --no-cache tzdata
ENV TZ=Asia/Shanghai

WORKDIR /app

# 先复制依赖文件并安装，利用Docker缓存层
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# 复制所有源代码
COPY . .

# 执行构建命令
RUN pnpm build

# Stage 2: Production stage
FROM node:20-alpine AS runner
WORKDIR /app

# 设置生产环境变量
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# 复制时区设置
COPY --from=builder /etc/localtime /etc/localtime
ENV TZ=Asia/Shanghai

# 复制standalone模式的输出文件
COPY --from=builder /app/.next/standalone /app
COPY --from=builder /app/public /app/public
COPY --from=builder /app/.next/static /app/.next/static

# 设置权限（可选但推荐）
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 改变文件所有权
RUN chown -R nextjs:nodejs /app/public

# 使用非root用户运行
USER nextjs

# 暴露应用端口
EXPOSE 3000

# 使用Next.js的standalone输出启动命令
CMD ["node", "server.js"]

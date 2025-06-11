# Stage 1: Build stage
FROM node:20-alpine AS builder
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build

# Stage 2: Production stage
FROM node:20-alpine AS runner
WORKDIR /app
RUN corepack enable
ENV NODE_ENV=production

# Copy built artifacts (compatible with both output modes)
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next

# Conditional copy for standalone mode
RUN test -d /app/.next/standalone && \
    cp -r /app/.next/standalone ./ || echo "Running in non-standalone mode"

# Copy main files
COPY --from=builder /app/next.config.mjs ./

EXPOSE 3000

# Conditional run command
CMD [ "sh", "-c", "if [ -f /app/server.js ]; then node server.js; else pnpm run start; fi" ]

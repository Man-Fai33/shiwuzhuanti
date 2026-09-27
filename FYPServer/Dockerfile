FROM node:18-alpine

WORKDIR /app

# 安裝 curl 以支援 Docker 容器 Healthcheck
RUN apk --no-cache add curl

# 快取 package.json 相依性安裝
COPY package*.json ./
RUN npm install --omit=dev

# 複製伺服器原始碼
COPY . .

# 建立圖片上傳目錄
RUN mkdir -p public/images

ENV PORT=7788
ENV NODE_ENV=production
ENV IS_DOCKER=true

EXPOSE 7788

# 容器健康狀態檢查
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:7788/system/status || exit 1

CMD ["node", "./bin/www"]

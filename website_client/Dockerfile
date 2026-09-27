# Stage 1: Build React 應用程式
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: 使用輕量化 Nginx Alpine 提供服務
FROM nginx:alpine

# 複製建置好的 React 產出檔案
COPY --from=builder /app/build /usr/share/nginx/html

# 複製自訂 Nginx 設定檔 (包含 SPA 重導向與 API 反向代理)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

STOPSIGNAL SIGQUIT

CMD ["nginx", "-g", "daemon off;"]

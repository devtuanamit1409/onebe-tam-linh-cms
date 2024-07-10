# Chọn image Node.js 18-alpine làm base
FROM node:18-alpine

# Cài đặt các gói cần thiết cho node-gyp
RUN apk add --no-cache make gcc g++ python3

# Tạo thư mục app trong container và đặt nó là working directory
WORKDIR /app

# Copy file package.json và package-lock.json vào working directory
COPY package*.json ./

# Cài đặt các dependency
RUN npm install

# Copy toàn bộ mã nguồn vào container
COPY . .

# Xây dựng ứng dụng Strapi
RUN npm run build

# Expose cổng 1338
EXPOSE 1338

# Command để chạy ứng dụng
CMD ["npx", "strapi", "start"]

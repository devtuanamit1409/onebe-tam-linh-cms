# Chọn image Node.js làm base
FROM node:14-alpine

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
CMD ["npm", "start"]

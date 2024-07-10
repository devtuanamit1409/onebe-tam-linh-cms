# Sử dụng hình ảnh Node.js chính thức với phiên bản 14
FROM node:18

# Đặt thư mục làm việc là /app
WORKDIR /app

# Sao chép package.json và package-lock.json vào thư mục làm việc
COPY package*.json ./

# Cài đặt các phụ thuộc và kiểm tra lỗi
RUN npm install

# Sao chép toàn bộ mã nguồn của dự án vào thư mục làm việc
COPY . .

# Xây dựng ứng dụng Strapi
RUN npm run build

# Mở cổng 1338
EXPOSE 1338

# Lệnh để khởi động Strapi
CMD ["npm", "start"]

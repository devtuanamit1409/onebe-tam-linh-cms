# Use Node.js 16 as the base image
FROM node:16

# Set working directory
WORKDIR /srv/app

# Copy project files to the docker image
COPY ./ ./

# Install dependencies
RUN npm install

# Build the Strapi project
RUN npm run build

# Expose the port Strapi runs on
EXPOSE 1338

# Start Strapi
CMD ["npm", "run", "start"]

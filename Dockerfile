# Use the official Strapi image as a parent image
FROM strapi/strapi

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
CMD ["strapi", "start"]

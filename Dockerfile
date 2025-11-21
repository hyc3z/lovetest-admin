# Build stage
FROM node:22-alpine AS builder

# Build arguments for version info
ARG VITE_APP_VERSION
ARG VITE_BUILD_TIME
ARG VITE_COMMIT_HASH

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Create .env.local with build info
RUN echo "VITE_APP_VERSION=${VITE_APP_VERSION}" > .env.local && \
    echo "VITE_BUILD_TIME=${VITE_BUILD_TIME}" >> .env.local && \
    echo "VITE_COMMIT_HASH=${VITE_COMMIT_HASH}" >> .env.local

# Build the app
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

FROM node:16-alpine AS builder
ENV NODE_ENV production

WORKDIR /app

COPY package.json .
COPY yarn.lock .
RUN yarn install

# Copy app files
COPY . .

# Build the app
RUN yarn build

# Bundle static assets with nginx
FROM nginx:1.27-alpine as production
ENV NODE_ENV production

# Copy built assets from builder
COPY --from=builder /app/build /usr/share/nginx/html

# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
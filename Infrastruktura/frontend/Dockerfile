# Build
FROM node:24-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npx ng build --configuration production

# Run
FROM nginx:1.29-alpine
COPY --from=build /app/dist/fitlog-front/browser /usr/share/nginx/html
COPY --from=infra frontend/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

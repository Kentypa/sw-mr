FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json yarn.lock ./

COPY apps/api/package.json ./apps/api/
COPY apps/api/tsconfig.json ./apps/api/tsconfig.json
COPY apps/api/tsconfig.build.json ./apps/api/tsconfig.build.json

RUN yarn install --frozen-lockfile

COPY apps/api ./apps/api

RUN yarn workspace api build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/package.json /app/yarn.lock ./
COPY --from=builder /app/apps/api/package.json ./apps/api/
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["node", "apps/api/dist/main.js"]
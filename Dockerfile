FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json ./
COPY bun.lockb ./

RUN apk update && apk add --no-cache --force-overwrite --virtual .gyp make gcc g++ libc6-compat bash python3 py3-pip
RUN npm install -g bun
RUN npm install -g node-gyp

RUN bun install --frozen-lockfile
RUN apk del .gyp


FROM oven/bun:1
COPY --from=builder /app/node_modules /app/node_modules

WORKDIR /app

EXPOSE 5173
CMD ["bun", "run", "dev"]

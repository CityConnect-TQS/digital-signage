FROM oven/bun:1

WORKDIR /app

COPY package.json ./
COPY bun.lockb ./

RUN bun install --frozen-lockfile

EXPOSE 5173
CMD ["bun", "run", "dev"]

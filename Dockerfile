FROM oven/bun:1 AS builder

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .

RUN bun run build
RUN bun install --frozen-lockfile --production

FROM oven/bun:1

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./

VOLUME ["/app/data"]
ENV DATABASE_URL=file:/app/data/local.db
ENV PORT=3000
ENV ORIGIN=http://localhost:$PORT/
EXPOSE $PORT

CMD ["bun", "run", "prod"]
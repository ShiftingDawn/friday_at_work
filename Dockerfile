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

ENV DATABASE_URL=postgres://root:mysecretpassword@localhost:5432/local
ENV DISABLE_REGISTER=false
ENV S3_API_URL=https://example.com
ENV S3_ACC_ID=myaccountname
ENV S3_TOKEN=supersecret
ENV S3_BUCKET=mybucket
ENV PUBLIC_S3_PUBLIC_URL=https://example.com
ENV PORT=3000
ENV ORIGIN=http://localhost:$PORT/

EXPOSE $PORT

CMD ["bun", "run", "prod"]
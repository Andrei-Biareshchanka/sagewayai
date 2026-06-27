# Stage 1: build
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/
COPY prisma.config.ts ./

RUN npm ci

COPY tsconfig.json ./
COPY src ./src/

RUN npx prisma generate
RUN npm run build

# Stage 2: run
FROM node:22-alpine AS runner

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/
COPY prisma.config.ts ./

RUN npm ci --omit=dev

RUN npx prisma generate

COPY --from=builder /app/dist ./dist

CMD ["sh", "-c", "npx prisma db push && node dist/index.js"]

# Stage 1: build
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/
COPY prisma.config.ts ./

RUN npm ci

COPY tsconfig.json ./
COPY src ./src/

ENV DATABASE_URL="postgresql://user:password@localhost:5432/placeholder"
RUN npx prisma generate
RUN npm run build

# Stage 2: run
FROM node:22-alpine AS runner

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/
COPY prisma.config.ts ./

RUN npm ci --omit=dev

ENV DATABASE_URL="postgresql://user:password@localhost:5432/placeholder"
RUN npx prisma generate

COPY --from=builder /app/dist ./dist

EXPOSE 3001

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/index.js"]

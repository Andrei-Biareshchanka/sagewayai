# Stage 1: build
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/
COPY prisma.config.ts ./

RUN npm ci

COPY tsconfig.json ./
COPY src ./src/

# Not a real connection string — prisma generate only checks that DIRECT_URL is set, never connects.
# The real value is injected by Railway at container runtime for `prisma migrate deploy`.
ENV DIRECT_URL="unused-during-build"
RUN npx prisma generate
RUN npm run build

# Stage 2: run
FROM node:22-alpine AS runner

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/
COPY prisma.config.ts ./

RUN npm ci --omit=dev

# Not a real connection string — prisma generate only checks that DIRECT_URL is set, never connects.
# The real value is injected by Railway at container runtime for `prisma migrate deploy`.
ENV DIRECT_URL="unused-during-build"
RUN npx prisma generate

COPY --from=builder /app/dist ./dist

EXPOSE 3001

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/index.js"]

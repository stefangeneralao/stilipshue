# Dependencies
FROM --platform=$BUILDPLATFORM node:18-alpine AS dependencies
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile --network-timeout 1000000

# Builder
FROM --platform=$BUILDPLATFORM node:18-alpine AS builder
WORKDIR /app

# COPY . .
COPY public ./public
COPY src ./src
COPY package.json ./
COPY tsconfig.json ./tsconfig.json
COPY next.config.js ./next.config.js

COPY --from=dependencies /app/node_modules ./node_modules

RUN yarn build

# Runner 
FROM node:18-alpine AS runner
WORKDIR /app

COPY public ./public
COPY package.json ./package.json
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ENV PORT 3000
EXPOSE 3000

CMD ["node", "server.js"]

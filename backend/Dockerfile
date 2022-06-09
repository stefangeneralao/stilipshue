# Dependencies
FROM --platform=$BUILDPLATFORM node:18-alpine AS dependencies
WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile --network-timeout 1000000

# Builder
FROM --platform=$BUILDPLATFORM node:18-alpine AS builder
WORKDIR /app

COPY src ./src
COPY package.json yarn.lock config.ts ./
COPY --from=dependencies /app/node_modules ./node_modules

RUN yarn build

# Runner
FROM node:18-alpine AS runner
WORKDIR /app

COPY --from=builder /app/build ./

EXPOSE 3001
ENV PORT 3001

CMD ["node", "."]

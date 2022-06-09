# Install dependencies
FROM node:alpine AS deps
WORKDIR /app
COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile --network-timeout=600000

# Builder
FROM node:alpine AS builder
WORKDIR /app
COPY src ./src
COPY package.json yarn.lock config.ts ./
COPY --from=deps /app/node_modules ./node_modules

RUN yarn build

# Runner
FROM node:alpine AS runner
WORKDIR /app

COPY --from=builder /app/build ./

EXPOSE 3001
ENV PORT 3001

CMD ["node", "."]

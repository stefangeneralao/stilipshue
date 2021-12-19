FROM node:alpine
WORKDIR /app

COPY build ./build
COPY node_modules ./node_modules
COPY package.json ./package.json

EXPOSE 3001

ENV PORT 3001

CMD ["node", "build"]
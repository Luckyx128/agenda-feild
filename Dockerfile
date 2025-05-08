# Etapa 1: Build
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY prisma/schema.prisma ./schema.prisma
COPY eslint.config.mjs ./eslint.config.mjs
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: Produção
FROM node:22-alpine


WORKDIR /app

COPY --from=builder /app ./
ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "start"]

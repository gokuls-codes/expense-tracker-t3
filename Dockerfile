FROM node:23.11.0-alpine3.16

WORKDIR /app

COPY prisma ./

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

ENV NODE_ENV=production

EXPOSE 3000

ENV PORT=3000

CMD ["npm", "run", "start"]
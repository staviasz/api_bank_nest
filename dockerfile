FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate dev

EXPOSE 3000

CMD [ "npm", "run", "start:dev" ]
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production=false

COPY . .

RUN npm run build

EXPOSE 9000

CMD ["node_modules/.bin/medusa", "start", "--host", "0.0.0.0", "--port", "9000"]

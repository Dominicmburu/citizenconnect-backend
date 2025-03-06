FROM node:22

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 5000

CMD ["npm", "run", "start"]

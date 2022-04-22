FROM node:16.14.0

WORKDIR /usr/src/app/api

COPY package*.json ./

RUN npm install express body-parser nodemon mongoose cors dotenv jsonwebtoken bcryptjs cookie-parser

EXPOSE 3080

CMD ["npm", "run", "dev"]
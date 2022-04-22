FROM node:16.14.0

WORKDIR /usr/src/app/ui

COPY package*.json ./

RUN npm install express http-proxy-middleware nodemon react-bootstrap bootstrap react-calendar nookies @mui/material @emotion/react @emotion/styled @mui/icons-material
RUN npm install react-icons

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
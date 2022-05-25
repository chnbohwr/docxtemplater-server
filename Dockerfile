FROM node:14-slim

COPY . /docxtemplater-server
WORKDIR /docxtemplater-server
RUN npm install

EXPOSE 3000

CMD npm start
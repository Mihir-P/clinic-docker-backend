FROM node:18-alpine

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
CMD npm run start:dev
ENTRYPOINT [ "/bin/sh", "-c", "npm run start:dev" ]

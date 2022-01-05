FROM node:12.19.0-alpine3.9 AS development

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install glob rimraf

RUN npm install

COPY . .

RUN npm run build

FROM node:12.19.0-alpine3.9 as production

ARG NODE_ENV=production
ARG PORT=5000

# ENV NODE_ENV=${NODE_ENV}
# ENV PORT=${PORT}


WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .
COPY .env.prod .env

COPY --from=development /usr/src/app/dist ./dist

EXPOSE ${PORT}

CMD ["node", "dist/main"]
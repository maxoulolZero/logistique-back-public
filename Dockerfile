FROM node:10 AS builder
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .

FROM node:10-alpine
WORKDIR /app
COPY --from=builder /app ./

ARG NODE_ENV="default value 1"
ARG PGADMIN_DEFAULT_EMAIL="default value 2"
ARG PGADMIN_DEFAULT_PASSWORD="default value 3"
ARG PGHOST="default value 4"
ARG POSTGRES_DB="default value 5"
ARG POSTGRES_PASSWORD="default value 6"
ARG POSTGRES_PORT="default value 7"
ARG POSTGRES_USER="default value 8"
ARG KONG="default value 9"
ARG URI="totoougenreqqch"


RUN echo "NODE_ENV=$NODE_ENV" > /app/.env
RUN echo "PGADMIN_DEFAULT_EMAIL=$PGADMIN_DEFAULT_EMAIL" >> /app/.env
RUN echo "PGADMIN_DEFAULT_PASSWORD=$PGADMIN_DEFAULT_PASSWORD" >> /app/.env
RUN echo "PGHOST=$PGHOST" >> /app/.env
RUN echo "POSTGRES_DB=$POSTGRES_DB" >> /app/.env
RUN echo "POSTGRES_PASSWORD=$POSTGRES_PASSWORD" >> /app/.env
RUN echo "POSTGRES_PORT=$POSTGRES_PORT" >> /app/.env
RUN echo "POSTGRES_USER=$POSTGRES_USER" >> /app/.env
RUN echo "KONG=$KONG" >> /app/.env
RUN echo "URI=$URI" >> /app/.env

EXPOSE 8400:8400


CMD ["npm", "run", "start"]
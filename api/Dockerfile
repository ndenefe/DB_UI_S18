FROM mysql:latest

ENV MYSQL_ROOT_PASSWORD password
ENV MYSQL_DATABASE CHIRINOS
ENV MYSQL_USER users_service
ENV MYSQL_PASSWORD 123


RUN mkdir -p /code/api
WORKDIR /code/api

COPY createDb.sql /code/api
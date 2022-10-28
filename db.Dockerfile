FROM mysql:8.0.31

COPY ./server/database/*.sql /docker-entrypoint-initdb.d/
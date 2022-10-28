FROM node:16.18.0

WORKDIR /client

COPY ./client/ .

RUN yarn

EXPOSE 5173

CMD ["yarn", "start"]
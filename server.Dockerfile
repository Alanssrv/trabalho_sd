FROM golang:1.19

WORKDIR /app

RUN apt-get update && \
    apt-get install libc-dev && \
    apt-get install gcc && \
    apt-get install make

COPY ./server/go.mod ./server/go.sum ./

RUN go mod download && go mod verify
RUN go install -mod=mod github.com/githubnemo/CompileDaemon

COPY ./server/ .

ADD https://raw.githubusercontent.com/eficode/wait-for/v2.1.0/wait-for /usr/local/bin/wait-for

EXPOSE 8090

ENTRYPOINT CompileDaemon --build="go build main.go" --command=./main
# Trabalho Prático (Etapa I)
## Disciplina **Sistemas Distribuídos**

## Contexto da aplicação
A aplicação se baseia em um sistema básico de gestão financeira pessoal, nele é possível armazenar, alterar, remover e visualizar em lista e em resumo, todas as transações cadastradas pelo usuário.

## Descrição do trabalho
* Desenvolvimento de uma aplicação REST, independente do tema, realizando um CRUD, em [**go**](https://go.dev/), junto a api utilizar banco de dados de preferência, no caso o utilizado foi [**MySQL**](https://www.mysql.com/) e por fim fazer um cliente (frontend) que faça a conexão com a api, para essa aplicação o client foi desenvolvido em **React + TypeScript**.
* Como uma etapa do trabalho, com o contexto da disciplina, foi solicitada que toda a aplicação utilize de containers, nesse trabalho está sendo utilizado o [**Docker**](https://www.docker.com/)

## Run & Install
* Para executar a solução, vá até a pasta raiz do projeto e execute os seguintes comandos:

    `docker compose build`
    
    `docker compose up`


## Em execução
* O banco de dados, api e o cliente, estão sendo executados nas seguintes portas, respectivamente:

    `http://localhost:3306/`

    `http://localhost:8090/`

    `http://localhost:5173/`
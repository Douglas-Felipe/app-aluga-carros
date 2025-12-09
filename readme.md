# Auth Project

Este projeto é dividido em duas partes: uma API em NestJS e uma aplicação em Angular 18.

## API

A API é construída com NestJS e utiliza Docker para o ambiente de desenvolvimento.

### Pré-requisitos

- Docker
- Docker Compose

### Rodando a API

1.  Navegue até o diretório `api`:

    ```bash
    cd api
    ```

2.  Execute o Docker Compose para construir e iniciar os contêineres:

    ```bash
    docker-compose up -d
    ```

A API estará disponível em `http://localhost:3000`. A documentação da API, gerada pelo Swagger, está disponível em `/api`.

### Rodando os testes da API

Para executar os testes da API, rode o seguinte comando no diretório `api`:

```bash
npm run test
```

## App

A aplicação é construída com Angular 18.

### Pré-requisitos

- Node.js (versão 18 ou superior)
- Angular CLI

### Rodando o App

1.  Navegue até o diretório `app`:

    ```bash
    cd app
    ```

2.  Instale as dependências:

    ```bash
    npm install
    ```

3.  Inicie o servidor de desenvolvimento:

    ```bash
    ng serve
    ```

A aplicação estará disponível em `http://localhost:4200`.

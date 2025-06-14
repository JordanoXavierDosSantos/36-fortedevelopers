# PrecifAI

## Como rodar o projeto

Abra **3 terminais** e execute os comandos abaixo:

### 1. Subir o banco de dados (MySQL)

No primeiro terminal:

```sh
cd backend
yarn dev:docker
```

### 2. Subir a API

No segundo terminal:

```sh
cd backend
yarn dev:api
```

### 3. Subir o frontend

No terceiro terminal:

```sh
cd frontend
yarn dev
```

O frontend estará disponível em http://localhost:3001 e a API em http://localhost:8080. ```

# PrecifAI

## Como rodar o projeto

Abra **2 terminais** e execute os comandos abaixo:

### 1. Subir a API

No segundo terminal:

```sh
cd backend
pip install fastapi uvicorn scikit-learn pandas numpy
uvicorn app.main:app --reload
```

### 2. Subir o frontend

No terceiro terminal:

```sh
cd front
yarn
yarn dev
```

O frontend estará disponível em http://localhost:3001 e a API em http://localhost:8000. ```

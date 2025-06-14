# PrecifAI

## Requisitos

- **Node.js** versão >= 18.0.0
- **Yarn** (ou npm)
- **Python** versão >= 3.8
- **pip** (gerenciador de pacotes Python)

## Como rodar o projeto

Abra **2 terminais** e execute os comandos abaixo:

### 1. Scraping

```sh
cd backend
python3 web_scrapping/main.py
```

### 2. Subir a API

No segundo terminal:

```sh
cd backend
pip install fastapi uvicorn scikit-learn pandas numpy
uvicorn app.main:app --reload
```

### 3. Subir o frontend

No terceiro terminal:

```sh
cd front
yarn
yarn dev
```

O frontend estará disponível em http://localhost:8080 e a API em http://localhost:8000. ```

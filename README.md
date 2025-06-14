# PrecifAI

## Nome da equipe

**Forte Developers**

## Integrantes da equipe

| Nome Completo                    | Função no Projeto                    |
| -------------------------------- | ------------------------------------ |
| Jordano Xavier dos Santos        | Desenvolvedor Backend / IA           |
| João Vitor Belmonte Rates        | Desenvolvedor Backend / Web Scraping |
| Kaio Vittor dos Santos Fernandes | Desenvolvedor Frontend               |
| Daniel Ferreira Schopf           | Desenvolvedor Frontend               |

## Tema / Área do problema

**Inteligência Artificial aplicada ao mercado imobiliário.**

## Problema a ser resolvido

A precificação de imóveis muitas vezes é subjetiva, demorada e suscetível a erros humanos. Compradores e vendedores têm dificuldades em saber o preço justo de mercado para um imóvel específico, levando a negociações longas ou prejuízos.

## Descrição da solução proposta

**PrecifAI** é uma aplicação web que utiliza inteligência artificial para sugerir o preço ideal de um imóvel, baseado em características como área, número de quartos, banheiros e vagas de garagem.

A solução utiliza **modelos de regressão linear** treinados com dados coletados via **web scraping** de anúncios reais de portais imobiliários.

Funcionalidades principais:

- **Web Scraping:** Coleta de dados de imóveis do portal Zap Imóveis para criar um dataset.
- **API de Previsão de Preço:** Desenvolvida em Python com FastAPI, utiliza modelos de IA para prever o preço de imóveis com base em suas características.
- **Frontend Web:** Interface simples e intuitiva para entrada dos dados do imóvel e visualização do preço sugerido.

## Tecnologias utilizadas

- **Python 3.8+**
  - FastAPI
  - scikit-learn (para modelos de IA)
  - pandas
  - numpy
- **Node.js 18+**
  - React.js (no frontend)
  - Vite
- **Outros:**
  - Yarn / npm
  - Uvicorn (server ASGI para a API)
  - BeautifulSoup e Requests (scraping para o dataset)

## Instruções de instalação e execução

### Pré-requisitos

- **Node.js** versão >= 18.0.0
- **Yarn** ou **npm**
- **Python** versão >= 3.8
- **pip** (gerenciador de pacotes Python)

### Rodando o projeto localmente

Abra **3 terminais**:

### 1️⃣ Terminal - Simular o Web Scraping (Mock)

```bash
cd backend
python3 web_scrapping/main.py
```

### 2️⃣ Terminal - Subir a API FastAPI (Backend / IA)

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

API rodando em: [http://localhost:8000](http://localhost:8000)

### 3️⃣ Terminal - Subir o Frontend Web (opcional)

```bash
cd front
yarn
yarn dev
```

Frontend acessível em: [http://localhost:8080](http://localhost:8080)

## Observações Finais

- O projeto utiliza um dataset gerado a partir de web scraping no portal Zap Imóveis, focando na região de Santa Maria - RS.
- A arquitetura é simples, mas escalável, e pode futuramente incorporar modelos mais complexos como Random Forest ou redes neurais.

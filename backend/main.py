from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
from sklearn.linear_model import LinearRegression
import numpy as np

app = FastAPI()

# Modelo de input esperado na API
class ImovelInput(BaseModel):
    area: float
    quartos: int
    banheiros: int
    garagem: int

# Dataset público
df = pd.read_csv("dataset_imoveis.csv")

# Treina o modelo de regressão linear
X = df[["area", "quartos", "banheiros", "garagem"]]
y = df["preco"]
model = LinearRegression()
model.fit(X, y)

# Rota da API para prever preço
@app.post("/prever_preco")
def prever_preco(imovel: ImovelInput):
    entrada = np.array([[imovel.area, imovel.quartos, imovel.banheiros, imovel.garagem]])
    preco_previsto = model.predict(entrada)[0]
    return {
        "preco_sugerido": round(preco_previsto, 2),
        "detalhe": f"Baseado em {len(df)} imóveis do dataset."
    }

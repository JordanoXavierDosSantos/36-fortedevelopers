from fastapi import FastAPI
from .models import ImovelInput
from .ml_model import PricePredictor

app = FastAPI(
    title="API Previsão de Preços de Imóveis",
    description="Modelo de Regressão Linear treinado com dataset público",
    version="1.0"
)

# Instancia o modelo
predictor = PricePredictor("dataset_imoveis.csv")

@app.post("/prever_preco")
def prever_preco(imovel: ImovelInput):
    preco = predictor.prever(imovel.area, imovel.quartos, imovel.banheiros, imovel.garagem)
    return {
        "preco_sugerido": preco,
        "detalhe": f"Modelo treinado com {len(predictor.df)} registros."
    }

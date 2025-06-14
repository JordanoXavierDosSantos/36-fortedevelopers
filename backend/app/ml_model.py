import numpy as np
from sklearn.linear_model import LinearRegression
from .utils import carregar_dataset

class PricePredictor:
    def __init__(self, dataset_path: str):
        self.df = carregar_dataset(dataset_path)
        self.model = LinearRegression()
        self.treinar_modelo()

    def treinar_modelo(self):
        X = self.df[["area", "quartos", "banheiros", "garagem"]]
        y = self.df["preco"]
        self.model.fit(X, y)

    def prever(self, area: float, quartos: int, banheiros: int, garagem: int) -> float:
        entrada = np.array([[area, quartos, banheiros, garagem]])
        preco = self.model.predict(entrada)[0]
        return round(preco, 2)

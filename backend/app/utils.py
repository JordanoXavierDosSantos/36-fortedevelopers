import pandas as pd

def carregar_dataset(caminho_csv: str):
    return pd.read_csv(caminho_csv)

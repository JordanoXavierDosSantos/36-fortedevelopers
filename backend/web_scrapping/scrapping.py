from time import sleep
import sqlite3
import requests as req
from parser import parser
from write_csv import salvar_imoveis_em_csv
local = ""
collection = []

headers = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/125.0.0.0 Safari/537.36"
    ),
    #"Accept-Language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
    #"Accept-Encoding": "gzip, deflate, br",
    #"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "Connection": "keep-alive",
    #"DNT": "1",  # Do Not Track
    #"Upgrade-Insecure-Requests": "1",
    # "Referer": "https://www.google.com/"
}

def web_scrapping(location_url, bairro, cidade, pages):


    page_counter = 1
    while page_counter <= pages:
        _url = "https://www.zapimoveis.com.br/venda/apartamentos/"+location_url+f"/?pagina={page_counter}&transacao=venda"

        page = req.get(_url, headers=headers)
        print(page.status_code, _url)
        if page.status_code != 200:
            sleep(10)
            continue
        page_counter+=1

        collection = []
        # print(page.text)
        parser(page.text, collection, bairro, cidade)

        salvar_imoveis_em_csv(collection)
        sleep(10)






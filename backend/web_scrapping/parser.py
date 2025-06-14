import re
from typing import Dict, List, Any
from bs4 import BeautifulSoup

def parser(html, collector: List[Any], bairro, cidade):
    soup = BeautifulSoup(html, "html.parser")

    # Encontrar os cards
    cards = soup.find_all("li", attrs={"data-cy": "rp-property-cd"})
    
    # Regex para extrair o ID do imóvel
    id_pattern = re.compile(r'id-(\d+)/')
    
    for card in cards:
        try:
            href = card.find("a", href=True)["href"]
            match = id_pattern.search(href)
            imovel_id = match.group(1) if match else None
        except:
            imovel_id = None
    
        try:
            preco = card.find("div", attrs={"data-cy": "rp-cardProperty-price-txt"}).find("p").get_text(strip=True)
            preco = int(preco.split()[-1].replace('.',''))
        except:
            preco = None
    
        try:
            quartos = card.find("li", attrs={"data-cy": "rp-cardProperty-bedroomQuantity-txt"}).get_text(strip=True)
        except:
            quartos = None
    
        try:
            banheiros = card.find("li", attrs={"data-cy": "rp-cardProperty-bathroomQuantity-txt"}).get_text(strip=True)
        except:
            banheiros = None
    
        try:
            vagas = card.find("li", attrs={"data-cy": "rp-cardProperty-parkingSpacesQuantity-txt"}).get_text(strip=True)
        except:
            vagas = None

        try:
            area = card.find("li", attrs={"data-cy": "rp-cardProperty-propertyArea-txt"}).get_text(strip=True).split()[-2]
        except:
            area = None


        collector.append({
            "id": imovel_id,
            "area": area,
            "preco": preco,
            "quartos": quartos,
            "banheiros": banheiros,
            "garagem": vagas,
            "bairro": bairro,
            "cidade": cidade,

        })
    return collector
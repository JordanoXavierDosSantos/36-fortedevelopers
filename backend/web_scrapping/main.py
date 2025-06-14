from scrapping import web_scrapping
locations = [
    ("rs+santa-maria++n-sra-medianeira", "Medianeira", "Santa Maria", 3),
    ("rs+santa-maria++centro", "Centro", "Santa Maria", 3)
]

for l_url, bairro, cidade, pages in locations:
    web_scrapping(l_url, bairro, cidade, pages)


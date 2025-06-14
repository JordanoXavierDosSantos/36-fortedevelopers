import sqlite3
import csv, os


def salvar_imoveis_em_csv(lista_imoveis, nome_arquivo='dataset_imoveis.csv'):

    arquivo_existe = os.path.exists(nome_arquivo)
    escrever_header = not arquivo_existe or os.stat(nome_arquivo).st_size == 0


    with open(nome_arquivo, mode='a+', newline='', encoding='utf-8') as csvfile:
        campo_csv = ['area','quartos', 'banheiros', 'garagem','bairro', 'cidade','preco']
        writer = csv.DictWriter(csvfile, fieldnames=campo_csv)

        if escrever_header:
            writer.writeheader()

        for imovel in lista_imoveis:
            print(imovel)
            if imovel.get('id') is None:
                continue

            # Limpa os campos para conter apenas os números
            area = ''.join(filter(str.isdigit, imovel.get('area', '0')))
            quartos = ''.join(filter(str.isdigit, imovel.get('quartos', '0')))
            banheiros = ''.join(filter(str.isdigit, imovel.get('banheiros', '0')))
            vagas = ''.join(filter(str.isdigit, imovel.get('garagem') or '0'))
            bairro = imovel.get('bairro')
            cidade = imovel.get('cidade')

            writer.writerow({
                #'id': imovel.get('id'),
                'area': area,
                'quartos': int(quartos) if quartos.isdigit() else 0,
                'banheiros': int(banheiros) if banheiros.isdigit() else 0,
                'garagem': int(vagas) if vagas.isdigit() else 0,
                'bairro': bairro,
                'cidade': cidade,
                'preco': imovel.get('preco'),
            })

    print(f"{len(lista_imoveis)} imóveis salvos em '{nome_arquivo}'.")

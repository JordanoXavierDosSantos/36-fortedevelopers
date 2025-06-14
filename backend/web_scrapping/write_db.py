import sqlite3
def salvar_imoveis_no_sqlite(lista_imoveis, nome_banco='imoveis.db'):
    conn = sqlite3.connect(nome_banco)
    cursor = conn.cursor()

    # Cria a tabela se não existir
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS imoveis (
            id TEXT PRIMARY KEY,
            preco INTEGER,
            quartos INTEGER,
            banheiros INTEGER,
            vagas INTEGER,
            cidade TEXT,
            bairro TEXT
        )
    """)

    for imovel in lista_imoveis:
        # Extração de números dos campos textuais
        quartos = ''.join(filter(str.isdigit, imovel.get('quartos', '0')))
        banheiros = ''.join(filter(str.isdigit, imovel.get('banheiros', '0')))
        try:
            vagas = ''.join(filter(str.isdigit, imovel.get('vagas', '0')))
        except TypeError:
            vagas = '0'

        cursor.execute("""
            INSERT OR REPLACE INTO imoveis (id, preco, quartos, banheiros, vagas, cidade, bairro)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (
            imovel.get('id'),
            imovel.get('preco'),
            int(quartos) if quartos.isdigit() else 0,
            int(banheiros) if banheiros.isdigit() else 0,
            int(vagas) if vagas.isdigit() else 0,
            imovel.get('cidade'),
            imovel.get('bairro')
        ))

    conn.commit()
    conn.close()
    print(f"{len(lista_imoveis)} imóveis salvos no banco '{nome_banco}'.")

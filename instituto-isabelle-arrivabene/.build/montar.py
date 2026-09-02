#!/usr/bin/env python3
"""
Montador de páginas estáticas — Instituto Isabelle Arrivabene.

Reaproveita os blocos compartilhados extraídos de index.html (sprite de
ícones, header + menu móvel, footer + CTA flutuante) e injeta o <main> de
cada página. Existe só na fase estática: no WordPress esses blocos passam a
ser get_header(), get_footer() e get_template_part('components/icons').

Uso:  python3 .build/montar.py
"""
import json
import os
import re
import sys

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(RAIZ)

PARTS = json.load(open('.build/parts.json', encoding='utf-8'))

CONTRATO = """<!--
THESIS: Uma pós-graduação em odontologia construída como o ceramista constrói um dente — núcleo opaco, camada translúcida, luz atravessando as duas. Recusa o landing clínico branco-e-azul com foto de sorriso e fileira de cards de ícone.
OWN-WORLD: Campos de espresso profundo alternando com pérola greige; champanhe da marca como única luz; halo incisal na aresta de cada plano; Bodoni Moda de alto contraste sobre Jost em caps largas.
STORY: O dentista entende que existe formação deste nível sem sair do Maranhão, acredita pelo corpo docente e pela estrutura, e fala com um consultor sobre um curso nomeado.
FIRST VIEWPORT: {viewport}
FORM: Camada Cerâmica, candidata 5 de 7, seed d3bb9c1b, code-led.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
-->"""

GABARITO = """<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{titulo}</title>
<meta name="description" content="{descricao}">
<meta name="theme-color" content="#201a14">
<link rel="canonical" href="https://institutoisabellearrivabene.com.br/{arquivo}">

<meta property="og:type" content="website">
<meta property="og:locale" content="pt_BR">
<meta property="og:site_name" content="Instituto Isabelle Arrivabene">
<meta property="og:title" content="{og_titulo}">
<meta property="og:description" content="{descricao}">
<!-- SUBSTITUIR: og:image real, 1200x630 -->
<meta property="og:image" content="assets/img/{og_img}.svg">
<meta property="og:url" content="https://institutoisabellearrivabene.com.br/{arquivo}">
<meta name="twitter:card" content="summary_large_image">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..700;1,6..96,400..600&amp;family=Jost:wght@400;500;600&amp;display=swap">

<link rel="stylesheet" href="assets/css/tokens.css">
<link rel="stylesheet" href="assets/css/base.css">
<link rel="stylesheet" href="assets/css/components.css">
<link rel="stylesheet" href="assets/css/pages.css">

<script>document.documentElement.classList.add('js');</script>
{schema}
</head>
<body>

{contrato}

<a class="pular-para-conteudo" href="#conteudo">Pular para o conteúdo</a>

{icons}{header}<main id="conteudo">

{conteudo}
</main>

{footer}<script src="assets/js/main.js" defer></script>
<script src="assets/js/components.js" defer></script>
</body>
</html>
"""

# ---------------------------------------------------------------------------
# Cada página: qual item do menu fica ativo, e se o header abre claro ou
# sobre campo escuro.
# ---------------------------------------------------------------------------
PAGINAS = {
    'cursos.html': dict(
        ativo='cursos.html',
        titulo='Cursos — Pós-graduações e Aperfeiçoamentos em Odontologia | Instituto Isabelle Arrivabene',
        og_titulo='Formação Avançada em Odontologia e Harmonização Facial',
        descricao='Cinco programas de pós-graduação e aperfeiçoamento em Odontologia e Harmonização Facial em São Luís/MA. Últimas vagas em Harmonização Orofacial.',
        og_img='banner-cursos',
        viewport='Banner escuro em sangria com foto de ambiente clínico tratada em espresso; título em didone com a palavra do ofício em itálico champanhe; selo de últimas vagas e dois CTAs; abaixo, o filtro de nível em pílula e a contagem de cursos.',
    ),
    'curso-interno.html': dict(
        ativo='cursos.html',
        titulo='Harmonização Orofacial — Pós-graduação | Instituto Isabelle Arrivabene',
        og_titulo='Pós-graduação em Harmonização Orofacial — Instituto Isabelle Arrivabene',
        descricao='Pós-graduação em Harmonização Orofacial no Champs Mall, Península, São Luís – MA. Protocolos faciais com prática supervisionada. Últimas vagas.',
        og_img='banner-curso',
        viewport='Banner escuro com trilha de pão, selo de últimas vagas e o nome do curso em didone monumental; CTA aceso e âncora para o conteúdo programático.',
    ),
    'sobre.html': dict(
        ativo='sobre.html',
        titulo='Sobre o Instituto — Excelência acadêmica e prática clínica | Instituto Isabelle Arrivabene',
        og_titulo='Sobre o Instituto Isabelle Arrivabene',
        descricao='O Instituto Isabelle Arrivabene oferece pós-graduações e aperfeiçoamentos que unem excelência acadêmica, prática clínica e professores reconhecidos nacionalmente, no Champs Mall, em São Luís/MA.',
        og_img='banner-sobre',
        viewport='Banner escuro com a frase institucional em didone; abaixo, os três pilares em colunas com filete champanhe no topo, e a linha do tempo à esquerda.',
    ),
    'professores.html': dict(
        ativo='professores.html',
        titulo='Professores — Corpo docente em atividade clínica | Instituto Isabelle Arrivabene',
        og_titulo='Corpo docente — Instituto Isabelle Arrivabene',
        descricao='Conheça o corpo docente do Instituto Isabelle Arrivabene: profissionais em atividade clínica que ensinam os protocolos que executam.',
        og_img='banner-professores',
        viewport='Banner escuro com o título e, imediatamente abaixo em campo claro, o campo de busca em pílula e a grade de retratos em 4 colunas, cada um virando ficha completa no clique.',
    ),
    'contato.html': dict(
        ativo='contato.html',
        titulo='Contato e Inscrição — Champs Mall, Península, São Luís/MA | Instituto Isabelle Arrivabene',
        og_titulo='Fale com um consultor — Instituto Isabelle Arrivabene',
        descricao='Fale com um consultor do Instituto Isabelle Arrivabene. Champs Mall, Península, São Luís – MA. WhatsApp, telefone e formulário de inscrição.',
        og_img='banner-contato',
        viewport='Banner escuro compacto com o título; abaixo, em campo claro, os canais de contato à esquerda em fichas com filete e, à direita, a caixa de formulário de inscrição elevada.',
    ),
}


def marca_ativo(header_html, arquivo):
    """Marca o item de menu da página atual e remove os aria-current herdados."""
    h = header_html.replace(' aria-current="page"', '')
    # header desktop e menu móvel usam classes diferentes
    h = h.replace('class="header__elo" href="%s"' % arquivo,
                  'class="header__elo" href="%s" aria-current="page"' % arquivo)
    h = h.replace('class="menu-movel__elo" href="%s"' % arquivo,
                  'class="menu-movel__elo" href="%s" aria-current="page"' % arquivo)
    return h


def main():
    escritos = []
    for arquivo, cfg in PAGINAS.items():
        caminho_conteudo = os.path.join('.build', 'main-' + arquivo)
        if not os.path.exists(caminho_conteudo):
            print('  (pulado, sem conteúdo) %s' % arquivo)
            continue

        conteudo = open(caminho_conteudo, encoding='utf-8').read()
        schema_path = os.path.join('.build', 'schema-' + arquivo)
        schema = open(schema_path, encoding='utf-8').read() if os.path.exists(schema_path) else ''

        html = GABARITO.format(
            titulo=cfg['titulo'],
            descricao=cfg['descricao'],
            og_titulo=cfg['og_titulo'],
            og_img=cfg['og_img'],
            arquivo=arquivo,
            schema=schema,
            contrato=CONTRATO.format(viewport=cfg['viewport']),
            icons=PARTS['icons'],
            header=marca_ativo(PARTS['header'], cfg['ativo']),
            footer=PARTS['footer'],
            conteudo=conteudo,
        )
        open(arquivo, 'w', encoding='utf-8').write(html)
        escritos.append('%s (%.1f KB)' % (arquivo, len(html) / 1024))

    for e in escritos:
        print('  escrito:', e)
    if not escritos:
        print('nada montado')
        return 1
    return 0


if __name__ == '__main__':
    sys.exit(main())

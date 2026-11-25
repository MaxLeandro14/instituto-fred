#!/usr/bin/env python3
"""
ONDAS — gera a borda em onda das divisas entre seções claras e grava as
imagens em assets/css/components.css (bloco ONDAS, como data URI).

Desenho tirado das divisórias onduladas da clínica do Instituto (referência
enviada pelo cliente em 25/11/2026): painéis de borda ondulada com uma fita de
luz correndo na borda. Daqui saem quatro imagens, todas num viewBox 1440×100
esticado na largura da seção (preserveAspectRatio='none'):

  onda:mascara           a forma — o que fica visível da seção de baixo;
  onda:fio               o fio de luz na borda (dourado + halo claro) e o eco,
                         um segundo fio mais fraco logo abaixo, defasado;
  onda:mascara-espelho   as duas, espelhadas, para as divisas alternarem.
  onda:fio-espelho

Os traços usam vector-effect='non-scaling-stroke': a espessura não deforma
quando a onda estica na largura da tela.

Uso:  python3 .build/ondas.py
"""
import os
import re
import sys

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CSS = os.path.join(RAIZ, "assets", "css", "components.css")

DOURADO = "#C29762"  # --dourado-logo

# Onda mestra (y de 0 a 100): ondulações de amplitudes diferentes, como a
# borda dos painéis. Vai além das bordas (-200..1640) para o eco, deslocado,
# não deixar ponta solta.
ONDA_BASE = [
    ("M", [(-200, 40)]),
    ("C", [(-90, 38), (-40, 64), (0, 64)]),
    ("C", [(110, 64), (160, 30), (290, 27)]),
    ("C", [(420, 24), (470, 72), (610, 74)]),
    ("C", [(760, 76), (810, 34), (950, 30)]),
    ("C", [(1070, 27), (1120, 60), (1230, 62)]),
    ("C", [(1330, 64), (1385, 44), (1440, 40)]),
    ("C", [(1500, 36), (1560, 50), (1640, 58)]),
]

# Amplitude: estica a onda em torno do meio (1 = como desenhada acima).
AMPLITUDE = 1.15
MEIO = 51

# Eco: deslocamento do segundo fio (unidades do viewBox).
ECO_DX, ECO_DY = -20, 13


def onda():
    partes = []
    for cmd, pontos in ONDA_BASE:
        coords = " ".join(
            "{:g} {:g}".format(x, round(MEIO + (y - MEIO) * AMPLITUDE, 1))
            for x, y in pontos
        )
        partes.append(cmd + coords)
    return "".join(partes)


def svg(corpo, espelho):
    if espelho:
        corpo = "<g transform='matrix(-1 0 0 1 1440 0)'>{}</g>".format(corpo)
    return (
        "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 100' "
        "preserveAspectRatio='none'>{}</svg>"
    ).format(corpo)


def data_uri(conteudo):
    """Codificação mínima para url("…") em CSS (aspas simples por dentro)."""
    for a, b in (("%", "%25"), ("#", "%23"), ("<", "%3C"), (">", "%3E")):
        conteudo = conteudo.replace(a, b)
    return 'url("data:image/svg+xml,{}")'.format(conteudo)


d = onda()
ve = "vector-effect='non-scaling-stroke'"

mascara = "<path d='{}L1640 100L-200 100Z'/>".format(d)

# Só metade de cada traço aparece: a máscara corta o que passa acima da
# borda. Por isso o halo fica todo por dentro do painel, como a luz do LED.
fio = (
    "<g fill='none' stroke-linecap='round'>"
    "<path d='{d}' stroke='#fff' stroke-opacity='.22' stroke-width='14' {ve}/>"
    "<path d='{d}' stroke='#fff' stroke-opacity='.5' stroke-width='6' {ve}/>"
    "<path d='{d}' stroke='{c}' stroke-opacity='.95' stroke-width='2.5' {ve}/>"
    "<path d='{d}' transform='translate({dx} {dy})' stroke='{c}' "
    "stroke-opacity='.42' stroke-width='1.1' {ve}/>"
    "</g>"
).format(d=d, ve=ve, c=DOURADO, dx=ECO_DX, dy=ECO_DY)

# Cada imagem vira uma variável no :root do bloco ONDAS; as regras de cada
# divisa escolhem o par (máscara + fio): a = onda, b = espelhada.
imagens = (
    ("onda:mascara", "--onda-a-mascara", svg(mascara, False)),
    ("onda:fio", "--onda-a-fio", svg(fio, False)),
    ("onda:mascara-espelho", "--onda-b-mascara", svg(mascara, True)),
    ("onda:fio-espelho", "--onda-b-fio", svg(fio, True)),
)

css = open(CSS, encoding="utf-8").read()
for marca, prop, conteudo in imagens:
    padrao = re.compile(
        r"(\(" + re.escape(marca) + r"\) \*/\s*" + re.escape(prop) + r": )url\(\"[^\"]*\"\)"
    )
    css, n = padrao.subn(lambda m: m.group(1) + data_uri(conteudo), css)
    if n != 1:
        sys.exit("marcador ({}) não encontrado em components.css".format(marca))
    print("ok", marca, "{:.1f} KB".format(len(data_uri(conteudo)) / 1024))
with open(CSS, "w", encoding="utf-8") as f:
    f.write(css)

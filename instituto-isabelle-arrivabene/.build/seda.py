#!/usr/bin/env python3
"""
SEDA — gera os fios do fundo acetinado e grava as máscaras em
assets/css/components.css (bloco SEDA, como data URI).

Inspirado no fundo do banner do Summit: feixes de fios finos que correm em
curvas longas, abrem e se estreitam como uma fita de seda torcida.

Cada feixe nasce de duas curvas de borda (bezier cúbicas em dois trechos).
Os fios são interpolações entre as bordas; onde as bordas se aproximam, o
feixe "torce". Os SVG saem só com alfa (traço preto + opacidade) porque são
usados como MÁSCARA no CSS: a cor vem do papel do campo (--seda-fio,
--seda-luz), então a mesma máscara serve em areia, creme e teal.

Por que data URI e não arquivo .svg: máscara CSS é carregada em modo CORS,
e aberta por file:// (sem servidor) ela não aparece. Embutida, funciona em
qualquer lugar e não custa requisição extra (~9 KB no CSS).

Uso:  python3 .build/seda.py
"""
import math
import os
import random
import re
import sys

VB_W, VB_H = 1600, 700
RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CSS = os.path.join(RAIZ, "assets", "css", "components.css")


def lerp(a, b, t):
    return (a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t)


def feixe(borda_a, borda_b, n, largura, alfa_min, alfa_max, ondula=0.0, semente=1):
    """Fios entre duas bordas com o mesmo número de pontos de controle.

    A distribuição em cosseno adensa os fios nas bordas (como a luz numa
    dobra de seda); `ondula` desloca só os pontos de controle internos, para
    que os fios não colapsem num ponto único quando o feixe torce.
    """
    rnd = random.Random(semente)
    fios = []
    for i in range(n):
        u = i / (n - 1)
        t = 0.5 - 0.5 * math.cos(math.pi * u)
        pts = [lerp(a, b, t) for a, b in zip(borda_a, borda_b)]
        if ondula:
            fase = math.sin(i * 0.9 + semente)
            pts = [
                (x, y + (ondula * fase if 0 < k < len(pts) - 1 else 0))
                for k, (x, y) in enumerate(pts)
            ]
        # Bordas mais acesas, miolo mais leve; um pouco de acaso para não
        # parecer régua.
        borda = abs(math.cos(math.pi * u))
        alfa = alfa_min + (alfa_max - alfa_min) * (0.35 + 0.65 * borda)
        alfa *= 0.85 + 0.3 * rnd.random()
        alfa = min(alfa, 1)
        p = pts
        r = [round(v) for xy in p for v in xy]
        d = "M{} {}C{} {} {} {} {} {}".format(*r[:8])
        if len(p) == 7:
            d += "C{} {} {} {} {} {}".format(*r[8:])
        fios.append("<path d='{}' opacity='{}'/>".format(d, "{:.2f}".format(alfa).lstrip("0")))
    return "<g stroke-width='{}'>{}</g>".format(largura, "".join(fios))


def svg(corpo, defs=""):
    return (
        "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 {w} {h}' "
        "preserveAspectRatio='xMidYMid slice'>{defs}"
        "<g fill='none' stroke='#000' stroke-linecap='round'>{corpo}</g></svg>"
    ).format(w=VB_W, h=VB_H, corpo=corpo, defs=defs)


def data_uri(conteudo):
    """Codificação mínima para url("…") em CSS (aspas simples por dentro)."""
    for a, b in (("%", "%25"), ("#", "%23"), ("<", "%3C"), (">", "%3E")):
        conteudo = conteudo.replace(a, b)
    return 'url("data:image/svg+xml,{}")'.format(conteudo)


# ---------------------------------------------------------------------------
# FIOS — o dourado. A fita principal sobe do canto de baixo à esquerda,
# estreita perto do meio e abre de novo em direção ao alto, à direita.
# ---------------------------------------------------------------------------
fita_principal = feixe(
    [(-90, 700), (260, 745), (560, 455), (840, 400), (1120, 345), (1360, 150), (1700, 70)],
    [(-90, 505), (300, 585), (600, 430), (860, 372), (1110, 318), (1400, 250), (1700, 262)],
    n=30, largura=1.05, alfa_min=0.22, alfa_max=0.95, ondula=6, semente=3,
)

# Arcos largos que descem do alto, à direita — o "contraponto" da fita.
arco_direita = feixe(
    [(1010, -60), (1190, 120), (1330, 330), (1700, 420)],
    [(1170, -60), (1330, 80), (1470, 250), (1700, 300)],
    n=14, largura=0.95, alfa_min=0.18, alfa_max=0.7, ondula=3, semente=7,
)

# Dois fios soltos no pé, à esquerda, para a fita não chegar sozinha.
pe_esquerda = feixe(
    [(-90, 640), (240, 560), (430, 600), (760, 760)],
    [(-90, 690), (220, 610), (470, 640), (700, 780)],
    n=6, largura=0.9, alfa_min=0.15, alfa_max=0.45, semente=11,
)

fios = svg("".join([fita_principal, arco_direita, pe_esquerda]))

# ---------------------------------------------------------------------------
# LUZ — o brilho do cetim: uma faixa larga e desfocada que cruza a fita
# principal, com fios claros por cima.
# ---------------------------------------------------------------------------
luz_defs = (
    "<filter id='c' x='-20%' y='-50%' width='140%' height='200%'>"
    "<feGaussianBlur stdDeviation='38'/></filter>"
    "<g fill='none' stroke='#000' stroke-linecap='round' filter='url(#c)'>"
    "<path d='M-120 120C360 60 700 260 1000 430C1250 570 1450 650 1720 620' "
    "stroke-width='120' opacity='.55'/>"
    "<path d='M-120 560C240 470 520 420 860 390C1160 360 1380 180 1720 110' "
    "stroke-width='70' opacity='.35'/></g>"
)

fios_claros = feixe(
    [(-90, 85), (380, 35), (700, 255), (1000, 420), (1250, 555), (1450, 640), (1700, 600)],
    [(-90, 205), (360, 180), (680, 305), (1000, 470), (1240, 605), (1460, 725), (1700, 765)],
    n=22, largura=1.0, alfa_min=0.25, alfa_max=1.0, ondula=5, semente=5,
)

luz = svg(fios_claros, defs=luz_defs)

# ---------------------------------------------------------------------------
# Grava no CSS: troca o url("…") logo após cada marcador (seda:fios / seda:luz).
# ---------------------------------------------------------------------------
css = open(CSS, encoding="utf-8").read()
for marca, conteudo in (("seda:fios", fios), ("seda:luz", luz)):
    padrao = re.compile(r"(\(" + marca + r"\) \*/\s*--seda-mascara: )url\(\"[^\"]*\"\)")
    css, n = padrao.subn(lambda m: m.group(1) + data_uri(conteudo), css)
    if n != 1:
        sys.exit("marcador ({}) não encontrado em components.css".format(marca))
    print("ok", marca, "{:.1f} KB".format(len(data_uri(conteudo)) / 1024))
with open(CSS, "w", encoding="utf-8") as f:
    f.write(css)

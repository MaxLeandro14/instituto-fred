---
name: Instituto Isabelle Arrivabene
description: Pós-graduações em Odontologia em São Luís/MA — campos de teal, areia e creme, títulos em Raleway caixa alta.
colors:
  teal: "#28797c"
  teal-profundo: "#1f5f61"
  teal-noite: "#174a4c"
  teal-cartao: "#226d70"
  areia: "#e2cdb0"
  areia-2: "#eedcc4"
  creme: "#f8eddb"
  creme-2: "#fbf4e8"
  creme-texto: "#faf1e3"
  tinta: "#2b2d2a"
  tinta-2: "#4f4e48"
  gelo: "#ecf5f4"
  erro: "#b42318"
  dourado-logo: "#c29762"
typography:
  display:
    fontFamily: "Raleway, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2rem, 1.3rem + 2vw, 2.75rem)"
    fontWeight: 500
    lineHeight: 1.12
    letterSpacing: "0.035em"
  h1:
    fontFamily: "Raleway, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.9375rem, 1.3rem + 2.1vw, 2.75rem)"
    fontWeight: 500
    lineHeight: 1.12
    letterSpacing: "0.035em"
  h2:
    fontFamily: "Raleway, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.75rem, 1.42rem + 1.1vw, 2.375rem)"
    fontWeight: 500
    lineHeight: 1.18
    letterSpacing: "0.075em"
  h3:
    fontFamily: "Raleway, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.01em"
  body:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.72
    letterSpacing: "normal"
  label:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "0.2em"
  button:
    fontFamily: "Raleway, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.1em"
rounded:
  sm: "4px"
  button: "6px"
  card: "8px"
  frame: "14px"
  pill: "99px"
spacing:
  s1: "4px"
  s2: "8px"
  s3: "12px"
  s4: "16px"
  s5: "24px"
  s6: "32px"
  s7: "40px"
  s8: "48px"
  s9: "64px"
  s10: "80px"
components:
  button-primary-on-teal:
    backgroundColor: "{colors.areia}"
    textColor: "{colors.teal-profundo}"
    typography: "{typography.button}"
    rounded: "{rounded.button}"
    height: "48px"
    padding: "0 32px"
  button-primary-on-teal-hover:
    backgroundColor: "#ffffff"
    textColor: "{colors.teal-profundo}"
  button-primary-on-light:
    backgroundColor: "{colors.teal}"
    textColor: "#ffffff"
    typography: "{typography.button}"
    rounded: "{rounded.button}"
    height: "48px"
    padding: "0 32px"
  button-primary-on-light-hover:
    backgroundColor: "{colors.teal-profundo}"
    textColor: "#ffffff"
  header:
    backgroundColor: "{colors.teal}"
    textColor: "#ffffff"
    height: "96px"
  dropdown:
    backgroundColor: "{colors.creme}"
    textColor: "{colors.teal-profundo}"
    rounded: "{rounded.card}"
    padding: "8px"
  card-course:
    backgroundColor: "{colors.areia}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.card}"
    padding: "24px"
  pill-status:
    backgroundColor: "{colors.areia}"
    textColor: "{colors.teal-profundo}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "8px 18px"
  input:
    backgroundColor: "{colors.creme-2}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.button}"
    height: "52px"
    padding: "12px 16px"
---

# Design System: Instituto Isabelle Arrivabene

<!-- impeccable:design-doc 1 -->

Registrado a partir do que está construído em `instituto-isabelle-arrivabene/`.
Onde este documento e o código divergirem, o código é a verdade.

Mundo visual: **Teal & Areia** — direção pinada pelo cliente a partir de uma
referência visual (novembro/2026). Substitui o mundo anterior, "Camada
Cerâmica" (espresso + champanhe, Bodoni + Jost).

## Overview

Um estúdio de saúde premium, não um landing clínico. A página é feita de
**campos inteiros** que se alternam — teal, areia e creme — e cada campo
reatribui os mesmos papéis de cor (`--txt`, `--titulo`, `--acao-bg`…). Todo
componente lê o papel, nunca a cor literal: um botão, uma ficha ou um
formulário funcionam nos três campos sem variante.

A voz é dada por títulos em **Raleway média, caixa alta, tracking aberto**,
sobre texto em **Manrope**. Os gestos de assinatura: botão de areia em caixa
alta, botão-círculo cujo disco se estende por baixo do rótulo, foto emoldurada
sobre cartão de areia girado com selo em teal profundo, texto vazado correndo
sob o hero.

Recusa explícita: o landing clínico branco-e-azul com foto de sorriso e
fileira de cards de ícone.

## Colors

Estratégia: **paleta comprometida em campos**. O teal ocupa header, hero,
banners, uma ou duas faixas por página, CTA e rodapé; areia e creme se
revezam nas regiões de leitura.

### Primary
- **Teal** (`teal`): header (sempre sólido), hero, banners, faixas de marca,
  CTA, rodapé. Também é o fundo do botão principal em campo claro.
- **Teal profundo** (`teal-profundo`): títulos e rótulos em campo claro, texto
  de botão sobre areia, selo das molduras.

### Secondary
- **Areia** (`areia`): botão principal sobre teal, faixas de leitura curta,
  corpo das fichas sobre creme, cartão girado das molduras, sublinhado ativo
  do menu, palavra de destaque nos títulos sobre teal.

### Neutral
- **Creme** (`creme`): o campo claro padrão; painel do dropdown; cartões
  sobre areia.
- **Tinta** (`tinta`) e **tinta-2**: texto principal e secundário em campo claro.
- **Gelo** (`gelo`): texto secundário sobre teal.
- **Creme-texto** (`creme-texto`): rótulos pequenos sobre teal.

### Named Rules

**Regra da areia grande.** Areia sobre teal mede 3,3:1. Ela só carrega texto
**grande** (≥ 24px, como a palavra de destaque do h1), bordas, ícones e fundos
de botão. Rótulo pequeno sobre teal usa `creme-texto` (4,6:1); texto
secundário usa `gelo` (4,6:1); corpo usa branco (5,1:1).

**Regra do teal profundo sobre areia.** Texto sobre areia — inclusive o texto
do botão — é `teal-profundo` (4,7:1), nunca o `teal` (3,3:1).

**Header é sempre teal.** Não existe header transparente sobre o hero; ao
rolar, ele só ganha sombra.

## Typography

- **Títulos (h1, h2):** Raleway 500, caixa alta. h1 com tracking 0,035em;
  h2 com 0,075em. `text-wrap: balance`.
- **h3 / títulos de ficha:** Raleway 500, caixa normal, teal profundo.
- **Texto:** Manrope 400, 16px, entrelinha 1,72; apoio de hero em 17–18px.
- **Botões:** Raleway 500, caixa alta, 15–16px, tracking 0,1em — como na
  referência. Exceção: o rótulo do botão-círculo é Manrope 800 (12px).
- **Rótulos e selos:** Manrope 800, caixa alta, 10–11px, tracking
  0,12–0,26em.
- **Logo:** vetor (SVG) — nome em Bellefair convertida em curvas, com o "A"
  de travessão ondulado redesenhado, e "INSTITUTO" em Raleway. Nenhuma fonte
  é carregada para a logo.

### Named Rules

**Título discreto.** Seções em que o conteúdo deve liderar (faixa do vídeo,
estrutura, depoimentos) usam `.titulo-discreto`: Raleway caixa alta em
18–22px com tracking 0,14em, no lugar do h2 grande.

**A palavra do ofício.** Em h1/h2, o `<em>` não é itálico: é a mesma letra na
cor de destaque do campo (areia sobre teal, teal sobre claro). Uma por título.

## Layout

- Contêiner até 90rem com gutter `clamp(1.25rem, 5vw, 6rem)`.
- Respiro de seção `clamp(3.75rem, 7vw, 6.5rem)`; mais espaço acima de um
  título do que abaixo.
- **Cabeça de seção:** título à esquerda, apoio à direita, alinhados pela
  base, a partir de 62rem; empilhados abaixo disso.
- **Hero e banners:** grade texto / figura (1fr / 0,86fr). Abaixo de 62rem o
  hero vira uma coluna e a figura sobe para logo depois dos botões (antes das
  etiquetas e dos fatos), para que os clínicos apareçam no primeiro viewport.
- **CTA final:** retirado de todas as páginas a pedido do cliente (24/11/2026).
  O CSS da cúpula (`.cta-final` em `pages.css`) ficou sem uso.
- **Novidades:** faixa em areia logo acima do rodapé, presente em todas as
  páginas — título discreto à esquerda, e-mail e botão à direita. Ganha um
  filete no topo só quando a última seção da página também é areia.
- **Rodapé:** coluna da marca só com logo e redes; o mapa fica numa faixa
  centralizada abaixo das colunas (até 44rem, 21:8), quase monocromático até
  o hover.
- **Banda:** faixa curta em areia logo após o hero — título à esquerda,
  dois parágrafos à direita, sem lista nem ícones.
- **Chamada:** faixa de uma linha só — frase à esquerda, botão de contorno à
  direita (ex.: "Ver todos os professores" na home).
- **Breakpoints:** menu horizontal ≥ 80rem; botões do header ≥ 40rem;
  grades colapsam em 74 / 62 / 48 / 34rem.
- O botão de menu (caixa com três traços) aparece em todas as larguras e abre
  uma gaveta lateral teal sobre véu desfocado.

## Elevation & Depth

Sombras sempre com deslocamento e desfoque, tingidas de teal noturno.
Dropdown: `0 18px 45px rgba(19,19,19,.18)`. Fichas sobem 4px com sombra média
no hover. Molduras levam a sombra mais longa (`0 24px 60px`).

## Shapes

Botões 6px; fichas e cartões 8px; molduras e quadros da galeria 14px; selos,
etiquetas e filtro em pílula. O cartão de areia atrás das molduras gira
−3,5° e aparece embaixo e à direita da foto. O quadro do hero é quase
quadrado (13:14) e tem no máximo 28rem de largura.

## Components

### Buttons
- **Acesa** (`.btn--acesa`): ação principal do campo — areia sobre teal, teal
  sobre claro. Hover: branco sobre teal, teal profundo sobre claro.
- **Contorno** (`.btn--contorno`): linha do campo; preenche com a ação no hover.
- **Botão-círculo** (`.btn-circulo`): disco de areia de 50px com seta; no hover
  o disco se estende (clip-path) por baixo do rótulo em caixa alta.
- **Header:** "Fale conosco" em contorno de areia, "Inscreva-se" em areia
  cheia, 42px de altura.

### Chips
- **Selo de estado:** cheio = últimas vagas (o ponto pulsa); contorno =
  matrículas abertas. Sobre imagem, ganha chão próprio (areia / creme).
- **Etiquetas:** cursos como pílulas de contorno, viram ação no hover.

### Cards / Containers
- **Ficha de curso:** imagem 16:9 em cima, corpo em `cartao` (areia sobre
  creme). Título Raleway primeiro, nível como meta logo abaixo (nunca acima),
  "Saiba mais" em caixa alta. Professores seguem a mesma ordem: nome, depois
  especialidade; no celular o cartão fica horizontal. A área
  de clique cobre a ficha inteira pelo link do título.
- **Moldura:** foto com cantos de 14px, cartão de areia girado atrás e selo
  em teal profundo sobreposto ao canto inferior direito. O selo declara um
  fato (ex.: "Matrículas — abertas nos cinco programas"), nunca um slogan, e é
  discreto: rótulo de 10px e texto de 15px em peso regular.
  Foto de terceiros leva a legenda "Imagem ilustrativa".

### Inputs / Fields
Fundo creme-2, borda teal a 40%, cantos 6px, 52px de altura. Foco: borda teal
+ anel de 3px. Erro em `erro` com mensagem que nomeia problema e correção.

### Navigation
Header teal fixo de 96px (76px no celular), com a logo em areia
(`logo-instituto-areia.svg`) a 64px de altura (48px no celular). A versão de
tela tem o traço da borboleta mais encorpado para não sumir em tamanho
pequeno; a dourada (`logo-instituto.svg`) é a fiel, para fundo claro. Links brancos em Manrope 500;
página atual com sublinhado de areia de 2px. "Cursos" abre dropdown creme com
os cinco programas e "Ver todos os cursos" em caixa alta. Sem JS, o dropdown
abre por `:hover`/`:focus-within` e a lista do header quebra linha.

### Carrossel
Um só componente para cursos e depoimentos: trilha com rolagem nativa e
snap, setas circulares de contorno e contador "1 / N" abaixo. Nos cursos,
cada ficha tem ~23,5rem — três inteiras e a ponta da quarta à vista no
desktop, uma e a ponta da seguinte no celular.

### Vídeo institucional
Quadro 16:9 com cantos de 14px sobre cartão creme girado −2°, na faixa areia
logo após o hero (título discreto à esquerda). A capa é um botão: disco
translúcido com anel que "respira" (3,2s, desligado com movimento reduzido),
rótulo "Conheça o Instituto" em Raleway caixa alta; no hover o disco acende em
areia. Sem JS aparecem os controles nativos; com `data-youtube` o player do
YouTube entra só no clique.

### Faixa de contorno
Texto em caixa alta, vazado (`-webkit-text-stroke` areia a 34%), correndo em
64s sob o hero e os banners. Decorativa (`aria-hidden`), parada com
movimento reduzido.

## Do's and Don'ts

### Do:
- Aplicar campo a `<section>` inteira (`campo-teal`, `campo-areia`; creme é o padrão).
- Ler cores pelos papéis do campo, nunca por hex dentro de componente.
- Usar pílula só quando ela carrega informação: estado de matrícula, nível, curso.
- Manter o header teal sólido em todas as páginas.

### Don't:
- Não pôr texto pequeno em areia sobre teal (3,3:1).
- Não pôr texto `teal` sobre areia; use `teal-profundo`.
- Não colocar sobrancelha/kicker acima de título de seção, nem rótulo de
  categoria acima do título de uma ficha.
- Não escrever texto dentro dos placeholders SVG; a legenda HTML nomeia o quadro.
- Não redesenhar a logo com live text: usar sempre os SVGs de `assets/img/`.
- Não inventar preço, duração, carga horária ou credenciamento.

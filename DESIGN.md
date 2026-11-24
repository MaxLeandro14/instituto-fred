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

**Regra da emenda.** Nenhuma divisa reta entre seções (pedido do cliente,
24/11/2026). Cada bloco (seções do `<main>`, novidades, rodapé) pinta no topo
e na base um degradê até o ponto médio, em oklab, entre a sua cor e a do
vizinho; cada lado ocupa `--emenda` (44–88px) numa curva S, e os fios da
seda se dissolvem na mesma faixa. É estático, sem animação. Vive em
`components.css` (EMENDAS, no fim), dentro de `@supports (color-mix)`. Seção
nova: basta usar o campo (`.campo-teal` / `.campo-areia` / creme); se ela
tiver `background-image` próprio, ponha `var(--emenda-camadas, none)` como
primeira camada, como em `.seda`. Barras fixas de interface (o sumário do
curso) ficam fora, e o **rodapé** também: a borda de cima dele é reta.
Entre dois campos lisos (creme → areia) o degradê vira uma faixa uniforme e
sem vida; ali a seção de areia ganha `seda seda--suave` (o cetim em marca
d'água da faixa do vídeo), como a galeria da Estrutura na home.

**Regra da curva.** Onde o **teal encontra um campo claro** (areia ou creme)
não há degradê: a seção de baixo sobe numa curva larga e suave por cima da de
cima (`--curva-h`, 28–56px). Teal → claro (hero/banner → seção seguinte,
Depoimentos → Novidades), a curva nasce rente à esquerda e cresce para a
direita, como a fita da seda; claro → teal (Estrutura → Depoimentos), ela é
espelhada. Descendo a página, as curvas alternam e formam uma onda. O fundo
da própria seção preenche a curva (máscara no topo + borda transparente para
o conteúdo não se mover), sem costura. O cliente achou "grosseiro" o
degradê largo entre teal e areia e recusou a linha esfumada curta
(24/11/2026); entre os tons claros o degradê fica. O rodapé não entra: borda
reta. Fica em `components.css`, CURVAS (seletores espelhados na EMENDA).

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

**Título discreto.** Seções em que o conteúdo deve liderar (estrutura,
depoimentos) usam `.titulo-discreto`: Raleway caixa alta em
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
  hero vira uma coluna e a figura sobe para logo depois dos botões (antes do
  endereço), para que a foto apareça no primeiro viewport. O hero não tem mais
  os fatos Formação/Prática/Turmas (retirados a pedido do cliente, 24/11/2026).
- **CTA final:** retirado de todas as páginas a pedido do cliente (24/11/2026).
  O CSS da cúpula (`.cta-final` em `pages.css`) ficou sem uso.
- **Novidades:** faixa em areia logo acima do rodapé, presente em todas as
  páginas, **aberta, sem cartão** (ver Components). Quando a última seção da
  página também é areia (Sobre, Curso), um filete de topo marca o início.
- **Rodapé:** coluna da marca só com logo e redes; o mapa fica numa faixa
  centralizada abaixo das colunas (até 44rem, 21:8), quase monocromático até
  o hover.
- **Banda:** faixa curta em areia logo após o hero — título à esquerda,
  dois parágrafos à direita, sem lista nem ícones.
- **Chamada:** faixa de uma linha só — frase à esquerda, botão de contorno à
  direita (ex.: "Ver todos os professores" na home).
- **Página de curso — o trilho** (`.trilho`, revisto em 24/11/2026): toda
  seção usa a mesma grade, guia estreito à esquerda (título, apoio, uma ação)
  e conteúdo largo à direita (`minmax(21rem, 1fr) / 1.85fr`, a partir de
  64rem). Os títulos caem no mesmo eixo e a página lê como um índice.
  Ordem: banner (com nível e selo de matrícula abaixo do título) → sumário →
  Sobre (título + foto no guia; texto e três diferenciais sob filete com
  trecho dourado) → Programa (guia fixo; **todos os módulos à vista**,
  numerados 01–06, em linhas número | título | tópicos ≥ 80rem) → Perguntas
  (guia com saída para o WhatsApp; acordeão) → Inscrição (três passos ligados
  por um fio; formulário ao lado). Foto sem legenda de endereço: o endereço
  já está no rodapé e na gaveta.
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
−3,5° e aparece embaixo e à direita da foto. O hero da home não usa moldura:
a foto fica na silhueta da borboleta da logo (ver Components).

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

### Borboleta do hero
A foto do hero da home vive dentro da **silhueta do símbolo da logo** (o mesmo
traçado de `logo-borboleta.svg`, SVG inline, eixo x = 593). Camadas, de trás
para a frente: o **eco** (contorno em areia a 45%, girado −4°, sem a ponta da
asa), as **asas** cheias (creme → areia, com sombra), o **traço dourado**
(`dourado-logo`, 4,5 unidades) e o **recorte da foto**, recortado pelas asas
mais o "céu" acima delas: o corpo fica dentro das asas e as cabeças saem por
cima. Sem selo (retirado a pedido do cliente, 24/11/2026). Há duas fotos
prontas: os **clínicos** (`persona-clinicos.webp`, ativa) e a **Isabelle
Arrivabene**, dona do instituto (`isabelle-arrivabene.webp`, com o `<image>`
comentado no `index.html`, centrada no eixo, a cabeça saindo pelo V entre as
asas de cima e as mãos acima do entalhe de baixo). O cliente alterna entre as
duas para comparar. Até 36rem de largura.

Entrada (o momento autoral da página, uma vez): o traço se desenha das pontas
para o centro em 2s, as asas acendem por dentro dele — mostrando os dois
perfis da logo — e a foto assenta na frente.
Com movimento reduzido, tudo aparece pronto.

A foto precisa ser um **recorte em fundo transparente**, pessoas cortadas na
cintura ou no quadril. As molduras com cartão girado continuam nos banners internos.

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

### Sumário da página
Barra "Nesta página" das páginas de curso, fixa logo abaixo do header
(`--sumario-h`, 52px), em creme-2 com filete e sombra curta: lê como um
segundo andar do header. Links em Manrope 600, 14px, caixa normal; a seção em
leitura ganha `aria-current` e um traço de teal de 2px que cresce da
esquerda (JS com IntersectionObserver, faixa a ~40% da tela). No celular a
lista rola na horizontal. As âncoras descontam header + sumário
(`scroll-padding-top`). Sem JS: fixa e funcional, só sem o traço.

### Carrossel
Um só componente sobre a **Embla Carousel** (`assets/js/vendor`, só na home),
estrutura `.carrossel > .carrossel__janela > .carrossel__trilha > itens`. A
janela sangra até a borda da tela; o recuo do gutter fica no padding da
trilha e na margem do último item. Sem a lib, a janela rola com scroll-snap
nativo; com ela, recebe `[data-embla]`, corta e a trilha é arrastada com
física suave (cursor de mão, sem seleção de texto durante o arrasto).

- **Cursos** (`data-carrossel="cursos"`): paradas alinhadas ao texto da
  página, para nas pontas. Cada ficha tem ~23,5rem — três inteiras e a ponta
  da quarta à vista no desktop, uma e a ponta da seguinte no celular. Abaixo:
  setas, **régua** (linha de 2px; o trecho aceso é a parte da trilha à vista,
  na posição em que está) e contador "1 / N". A foto de cada ficha é 14% mais
  larga que o quadro e corre contra o arrasto (**paralaxe** de até 6%, pela
  propriedade `translate`, separada do zoom de hover).
  **Traços de acabamento** (só nas fichas do carrossel, cantos de 14px): um
  filete dourado de 1px (`dourado-logo`) deslocado 14px para baixo e à
  direita atrás de cada ficha, que sai de trás dela em cascata quando o
  carrossel aparece e vai a 20px no hover; um passe-partout creme a 42% por
  dentro da foto (12px de recuo; o selo pousa sobre ele); filete acima do
  pé; e a seta num círculo de contorno de 36px que se preenche de teal
  profundo no hover. O nível ("Pós-graduação") fica sem traço antes, a
  pedido do cliente.
- **Depoimentos** (`data-carrossel="depoimentos"`): **laço centrado**; o cartão
  em foco fica nítido e os vizinhos recuam (escala 0,9, opacidade 0,32) na
  medida da distância ao centro (`--perto`, escrito pelo JS a cada quadro).
  Controles centrados: seta, pontos, seta, pausa. O ponto aceso se alonga e
  **enche como cronômetro** da passagem automática (7s). A passagem pausa com
  mouse em cima, foco de teclado, arrasto, aba oculta ou carrossel fora da
  tela, e o cronômetro retoma de onde parou; o botão de pausa vence tudo.
  Com movimento reduzido não há passagem automática nem botão de pausa.

### Vídeo institucional
Quadro 16:9 com cantos de 14px sobre cartão creme girado −2°, na faixa areia
com fundo de seda logo após o hero, ao lado da **citação da Isabelle**
(`.citacao`, referência do cliente de 24/11/2026). A citação tem o retrato (o
mesmo recorte da borboleta, num quadro creme com o canto de baixo à direita em
quarto de círculo) e, ao lado, o nome dela em assinatura manuscrita (Mrs Saint
Delafield, `--dourado-escrita`, −10°) que cruza o canto de cima do retrato; a
frase entre aspas em Manrope; "Saiba mais" em caixa alta atravessando um anel
dourado de 1px, à direita. Texto aberto sobre a areia, sem cartão. A
assinatura se escreve da esquerda para a direita (recorte animado, 1,8s)
quando a faixa entra na tela; a fonte manuscrita só carrega na home. Citação
e vídeo ficam lado a lado a partir de 75rem (1,5fr / 1fr); abaixo disso,
empilhados (retrato e frase lado a lado a partir de 40rem). A
capa do vídeo é um botão: disco
translúcido com anel que "respira" (3,2s, desligado com movimento reduzido),
rótulo "Conheça o Instituto" em Raleway caixa alta; no hover o disco acende em
areia. Sem JS aparecem os controles nativos; com `data-youtube` o player do
YouTube entra só no clique.

### Novidades (e-mail ou WhatsApp)
Faixa aberta direto sobre a areia: **sem cartão, borda, fundo próprio ou
sombra** (pedido do cliente, 24/11/2026: não gosta de card). Texto à
esquerda, formulário à direita a partir de 62rem; empilhados abaixo disso.
A borboleta da logo vem solta, em traço dourado, ao lado do título (acima
dele até 36rem); é o símbolo `i-borboleta` do sprite, com traço que não
escala (o SVG da logo a 40px viraria um fio de 0,3px).

- **Canal:** duas opções de texto em Raleway caixa alta com ícone, E-mail e
  WhatsApp (rádios de verdade, num `fieldset`). A escolhida fica em teal
  profundo com traço de 2px por baixo; foco de teclado com contorno.
- **Campo:** só o do canal escolhido aparece (CSS `:has()`, funciona sem JS;
  o JS desativa o outro para não ir no envio). Input sem caixa sobre um
  filete; no foco, um traço de 2px em teal profundo corre da esquerda (é o
  indicador de foco). WhatsApp com máscara `(98) 91234-5678`, aceita +55
  colado. Erro: o filete e a mensagem ficam em `erro`, com `aria-invalid`,
  e somem ao corrigir.
- **Botão:** "Quero receber", `btn--acesa` chapado, sem degradê nem sombra.
  No celular (até 30rem) ocupa a largura toda.

### Seda (fundo acetinado)
Inspirada no fundo do banner do Summit do Instituto (24/11/2026, pedido do
cliente): feixes de fios finos que correm em curvas longas, abrem e torcem
como uma fita de seda, sobre um brilho de cetim. Classe `.seda` na `<section>`
que já tem o campo; `.seda--espelho` inverte o desenho.

- **Camadas:** brilho largo + sombra quente nos cantos (gradientes no fundo da
  seção) → luz (`::before`: faixa desfocada e fios claros) → fios (`::after`).
- **Cor pelo papel do campo:** `--seda-fio`, `--seda-luz`, `--seda-brilho`,
  `--seda-sombra`. Areia: fios no dourado da logo, luz creme. Teal: fios em
  areia a 42%, luz gelo, cantos em teal noturno.
- **Máscaras** geradas por `.build/seda.py` e embutidas como data URI em
  `components.css` (máscara CSS por `file://` não carrega). Para mudar o
  desenho, edite o script e rode `python3 .build/seda.py`.
- **Onde está:** faixa do vídeo (areia, com os fios suavizados a pedido do
  cliente: quase marca d'água, o brilho fica inteiro), depoimentos (teal,
  espelhada) e os banners das páginas internas (teal). Não vai no hero da
  home (a borboleta é o momento autoral) nem na faixa Novidades (estreita
  demais: a fita cruza o título).
- **Contraste:** no teal, a luz (`--seda-foco`) fica atrás da figura, nunca
  atrás do texto; branco sobre o centro do brilho cai para ~4,1:1. No
  celular, `--seda-pos` escolhe a fatia da fita que corre pelos vãos. Botão
  de contorno sobre a seda desfoca os fios por trás (`backdrop-filter`).
- Estática, decorativa, some em `forced-colors`.

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

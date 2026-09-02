# Design System — Instituto Isabelle Arrivabene

<!-- impeccable:design-doc 1 -->

Registrado a partir do que está construído em `instituto-isabelle-arrivabene/`,
não a partir da intenção. Onde este documento e o código divergirem, o código
é a verdade e este arquivo é que está desatualizado.

Mundo visual: **Camada Cerâmica** (seed `d3bb9c1b`, candidata 5 de 7, code-led).

---

## A ideia que governa tudo

O site é construído como o ceramista constrói um dente: **núcleo opaco,
camada translúcida por cima, luz atravessando as duas**.

Isso não é metáfora decorativa — é a regra de composição:

1. **A alternância de campos É a estratificação.** Regiões inteiras de espresso
   profundo alternam com regiões inteiras de pérola greige. Nunca um card
   escuro solto num campo claro.
2. **Translucidez só onde um plano realmente se sobrepõe a um campo.** A placa
   do hero é o único uso de `backdrop-filter` em conteúdo. Não existe "glass"
   decorativo.
3. **O ouro é luz transmitida, e é o único elemento com permissão de acender.**

Recusa explícita: o landing clínico branco-e-azul com foto de sorriso e
fileira de cards de ícone, que é o padrão da categoria.

---

## Paleta

Fixada pela marca (peça oficial + logo). Não derivada, não negociável.

| Token | Valor | Papel |
|---|---|---|
| `--campo` | `#201A14` | Espresso profundo. O campo mais escuro, hero e rodapé. |
| `--campo-2` | `#2C2419` | Espresso um passo acima. |
| `--sombra` | `#3A3128` | Marrom morno de corpo. Campo escuro intermediário. |
| `--sombra-2` / `-3` | `#4A4036` / `#5D5145` | Superfícies e scrollbar. |
| `--halo` | `#CBBDA6` | Texto secundário sobre campo escuro. |
| `--halo-forte` | `#E6DCC8` | A aresta incisal. |
| `--ouro` | `#B29A6E` | **A barra champanhe da peça oficial.** Acento ativo. |
| `--ouro-2` | `#C9B48E` | Ouro sobre escuro (hover, itálico do display). |
| `--ouro-3` | `#E2D5BC` | Seleção de texto. |
| `--ouro-marca` | `#A98A57` | O ouro da logo. Wordmark, ícones sobre claro. |
| `--ouro-fundo` | `#8A6E42` | O único ouro escuro o bastante para texto branco (4,8:1). |
| `--perola` | `#F3F0EC` | Greige claro. O campo dominante. |
| `--perola-2` / `-3` | `#EAE4DB` / `#DCD3C7` | Superfícies e fundos de imagem. |
| `--tinta` | `#2A2420` | Texto sobre campo claro. |
| `--cinza-quente` | `#6B645C` | Texto secundário sobre campo claro (5,1:1). |

**Sem azul em lugar nenhum.** A paleta é integralmente morna.

### A regra de contraste que mais se erra

Branco sobre `--ouro` mede **2,7:1 e reprova**. O sistema usa espresso sobre
champanhe (**6,3:1**). Para o caso raro que exige texto branco existe
`--ouro-fundo`. Se você vir texto branco sobre dourado no site, é bug.

### Campos

Aplicados a `<section>` inteiras, nunca a componentes soltos. Cada um
reatribui `--sup`, `--txt`, `--txt-2`, `--linha` e `--linha-forte`, e todo
componente lê esses papéis em vez de cores literais — é por isso que botões,
fichas e formulários funcionam nos três campos sem variante.

| Classe | Fundo | Uso |
|---|---|---|
| *(padrão)* | `--perola` | Leitura, listas, formulários. |
| `.campo-escuro` | `--sombra` | Cursos, depoimentos, comparação. |
| `.campo-queima` | `--campo` | Hero, banners internos, estrutura, rodapé. |
| `.campo-champanhe` | `--ouro` | CTA final. Texto sempre espresso. |

---

## Tipografia

**Bodoni Moda** (display, variável, eixo óptico `opsz`) + **Jost** (texto).

Bodoni foi escolhida porque o contraste hairline/haste é o mesmo contraste
esmalte/dentina do mundo visual, e porque é a letra que a logo já sugere.
Jost porque a assinatura da identidade é a caps larga, e ela executa isso bem.

Deliberadamente **não** usadas: Playfair Display e Inter, sugeridas no brief
original. São os dois defaults mais previsíveis da categoria; o brief dizia
"Sugestão", não obrigação.

| Token | Valor |
|---|---|
| `--fs-display` | `clamp(2.125rem, 5.6vw, 4.5rem)` |
| `--fs-h1` | `clamp(2.125rem, 5vw, 3.625rem)` |
| `--fs-h2` | `clamp(1.75rem, 3.4vw, 2.625rem)` |
| `--fs-corpo` | `clamp(1.0625rem, 0.35vw + 0.98rem, 1.1875rem)` |
| `--tr-caps` | `0.14em` — a assinatura da marca |
| `--tr-caps-larga` | `0.24em` — só no "INSTITUTO" do lockup |
| `--medida` | `68ch` |

`h1`/`h2` são Bodoni; `h3`/`h4` são Jost — títulos de bloco pertencem à voz
de interface, não à voz de display.

**O itálico da didone aparece uma vez por página**, em `--ouro-2`, na palavra
que carrega o ofício ("*evoluir*", "*prática clínica*", "*consultor*"). É o
único itálico com esse peso em qualquer superfície.

**Sem sobrancelha acima de título.** Não existe kicker/eyebrow no sistema.
O `.caps` existe, mas só como legenda *dentro* de um bloco.

---

## O sistema de estado: luz transmitida

A leitura de matrícula não é feita por texto colorido. É feita por luz.

| Estado | Aresta incisal (`.ficha__aresta`) | Brasa interna (`.ficha::after`) |
|---|---|---|
| Matrículas abertas | Halo frio, `opacity 0.32` | Apagada; acende no hover |
| Últimas vagas | Gradiente champanhe, `opacity 0.8` | Já acesa a `0.55`; sobe a `1` |
| Hover / focus-within | `opacity 0.85` | `opacity 1` |

O selo (`.selo--ultimas`) reforça em texto, e seu ponto pulsa. Mas a
informação primária é o halo.

**Consequência prática:** se você adicionar um brilho dourado decorativo em
qualquer outro lugar, o sistema para de comunicar estado. O ouro só acende
onde há matrícula.

---

## Composição

### Espaço

Uma escala só (`--s1` … `--s12`), em toda a superfície. Regra do sistema:
**mais espaço acima de um título do que abaixo** — `--acima-titulo` é
`clamp(2rem, 4vw, 3.5rem)`, `--abaixo-titulo` é `clamp(1rem, 1.6vw, 1.5rem)`.

### Cantos e profundidade

Cerâmica é esculpida, não arredondada: `--r1: 2px`, `--r2: 4px`, `--r3: 10px`.
A `--r-camada` (`12px 12px 2px 2px`) é assimétrica de propósito — a camada de
esmalte assenta *por cima*, então o topo é mais macio que a base.

Toda sombra tem deslocamento **e** desfoque. Não existe halo colorido de
deslocamento zero.

### Estruturas que recusam o card

- **`.estratos`** (destaques da home): bandas separadas por filete com recuo
  progressivo — 0, 1.25, 2.5, 2.5, 1.25, 0rem. A seção desenha a camada. Não
  são seis cards iguais de ícone + título + texto.
- **`.estacoes`** (matrícula): estações numeradas com filete que acende em
  champanhe até a etapa atual. A numeração fica porque a ordem informa.
- **`.galeria`**: grade assimétrica 4+2 / 2+2, não uma grade uniforme.

---

## Movimento

Um momento autoral, não efeitos espalhados.

- Revelação por scroll a partir de um padrão **já visível** (`[data-revelar]`
  só ganha opacidade zero quando `html.js` existe). Quem está no primeiro
  viewport nunca espera scroll.
- Ease-out exponencial: `cubic-bezier(0.16, 1, 0.3, 1)`.
- `prefers-reduced-motion` desliga tudo e revela tudo.
- **Sem animação de propriedade de layout.** O header muda de campo, não de
  altura.

---

## Superfícies do navegador

Tematizadas a partir da paleta, porque são o sinal mais barato de que a página
foi construída e não montada: `::selection`, `caret-color`, `scrollbar-color`,
`::-webkit-scrollbar`, `:focus-visible`, `text-underline-offset`,
`font-variant-numeric: tabular-nums` em tabelas e números.

O anel de foco é a aresta incisal: espresso sobre campo claro, ouro sobre
campo escuro.

---

## Ícones

SVG desenhado à mão, grade 24×24, traço **1.5 constante**, cantos redondos.
No registro do mundo: pórtico clássico, instrumental clínico, selo com fitas,
e o glifo `i-camada` — três arcos aninhados que são a própria estratificação.

Nunca emoji, nunca glifo Unicode substituindo ícone.

Sprite inline (`components/icons.html`), não externo, para funcionar em
`file://` e sobreviver a qualquer CDN.

---

## Acessibilidade — o que está garantido

- Landmarks semânticos, `h1` único por página, hierarquia sem salto.
- Corpo ≥ 4,5:1 em todos os campos; secundário sobre pérola mede 5,1:1;
  halo sobre espresso mede ~7:1.
- Foco visível em toda superfície, com cor por campo.
- Menu móvel e modal prendem o foco, fecham em `Escape` e devolvem o foco
  ao gatilho.
- Todo controle de formulário tem `<label>` real; erros nomeiam **o problema
  e a correção**, e o primeiro campo inválido recebe foco no submit.
- Carrossel navegável por seta do teclado, com botões desabilitados nas pontas
  em vez de laço infinito falso.
- `.pular-para-conteudo` como primeiro elemento focável.

## Degradação sem JavaScript

Nada depende de script para existir. Sem JS: o menu vira lista inline e o
hambúrguer some, os acordeões ficam todos abertos, as revelações não se
aplicam, o conteúdo continua legível e navegável.

---

## Limites conhecidos deste registro

- O **símbolo da borboleta não está no build**. O lockup roda tipográfico até
  o vetor oficial chegar; o slot está comentado no header e no footer.
- As 26 imagens são **placeholders autorais** em SVG, com o briefing da foto
  real na tag `<desc>` de cada arquivo.
- O detector de design rodou em modo **DEGRADED** (sem os módulos de parser
  HTML), então "zero achados" é subcontagem, não atestado.

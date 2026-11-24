# Instituto Isabelle Arrivabene — site institucional

HTML + CSS + JavaScript puro. Zero framework CSS. Uma única biblioteca JS,
por decisão sua: **Embla Carousel 8.6.0** (MIT, ~7 KB gzip), só nos
carrosséis da home, servida do próprio site (`assets/js/vendor/`). Sem ela,
os carrosséis continuam rolando com scroll-snap nativo.
Estruturado para virar tema WordPress sem retrabalho.

---

## ⚠️ Lista obrigatória de substituição antes de publicar

Nada abaixo é invenção minha: são os pontos onde não havia informação
confirmada. Cada um está marcado no código com um comentário `SUBSTITUIR`.

Para localizar todos de uma vez:

```bash
grep -rn "SUBSTITUIR" --include="*.html" .
```

### 1. Logo

A logo foi **redesenhada em vetor** (24/11/2026) a partir da imagem enviada:
borboleta de traço único com os dois perfis traçada à mão; nome em Bellefair e
"INSTITUTO" em Raleway (ambas SIL OFL, convertidas em curvas), com o "A" de
travessão ondulado redesenhado. Não depende de fonte instalada.

| Arquivo | Uso |
|---|---|
| `assets/img/logo-instituto.svg` | Versão fiel, dourado `#C29762`, para fundo claro e impressos |
| `assets/img/logo-instituto-areia.svg` | Versão de tela, areia `#E2CDB0`, traço da borboleta mais encorpado — header, gaveta e rodapé (sobre teal) |
| `assets/img/logo-borboleta.svg` | Só o símbolo, dourado (favicon, avatar de redes) |

- [ ] Se existir o arquivo vetorial oficial da marca, conferir contra ele: o
      oficial prevalece sobre este redesenho.
- [x] Favicon: `assets/icons/favicon.svg` (borboleta em areia sobre teal, traço
      simplificado para 16–32px), com `favicon-32.png` e `apple-touch-icon.png`.

### 2. Contato

| Onde | O quê |
|---|---|
| Header, footer, CTA flutuante, contato | Número real de WhatsApp (todos apontam para `5598000000000`) |
| Footer, contato | Telefone fixo |
| Footer, contato | E-mail |
| Footer, contato | Endereço completo: sala/andar, rua, número, CEP |
| Footer, contato | Perfis reais de Instagram, Facebook e LinkedIn |
| Footer | Razão social e CNPJ |
| Contato | Horário de atendimento real |
| Footer | Embed de mapa do endereço exato (hoje aponta para a Península como aproximação) |
| Footer | Links reais de política de privacidade e termos de uso |

### 3. Conteúdo de exemplo, rotulado como tal no site

Estes blocos existem para dimensionar o layout e **estão marcados na página**
com o aviso "Conteúdo de exemplo". Remover o aviso junto com o conteúdo.

- [ ] **Depoimentos** (home) — 4 textos de exemplo. **O aviso visível foi
      retirado a seu pedido**; só o comentário `SUBSTITUIR` no código e o
      "· exemplo" de cada cartão ainda marcam que não são reais. Substituir por
      depoimentos reais e autorizados, ou remover a seção, antes de publicar.
- [ ] **Professores** (professores) — 6 perfis de
      exemplo. Substituir por nomes, especialidades, currículos e fotos reais.
      Em `professores.html` **o aviso visível foi retirado a seu pedido**; só o
      comentário `SUBSTITUIR` no código marca que os perfis não são reais.

### 3b. Vídeo institucional (home)

Na faixa logo abaixo do topo, ao lado da citação da Isabelle. Se o arquivo
faltar, o clique mostra "Vídeo em breve".

- [ ] **Citação da Isabelle** (ao lado do vídeo, com o retrato dela e o nome
      em assinatura manuscrita): a frase é **provisória**, tirada da legenda
      do post do vídeo. Está em `index.html`, em `<div class="citacao">`
      (marcado com `SUBSTITUIR`). O retrato usa o mesmo arquivo da borboleta,
      `assets/img/isabelle-arrivabene.webp`.

- [x] **Arquivo próprio:** o vídeo do post do Instituto no Instagram
      (12/11/2026, 1:55, 1080p) está em duas fontes:
      `assets/video/instituto.webm` (o VP9 original, sem recompressão; o
      navegador usa este primeiro) e `assets/video/instituto.mp4` (H.264 1080p,
      para quem não toca VP9). Para trocar o vídeo, substituir os dois
      arquivos (ou só o MP4, apagando o `<source>` do WebM).
- [ ] Capa: segue a provisória `assets/img/video-capa.svg`, por escolha do
      cliente (24/11/2026).
- [ ] **Ou YouTube:** em `index.html`, preencher `data-youtube="ID_DO_VIDEO"` no
      `<figure class="video">`. O player só carrega no clique, pelo domínio
      sem cookies (youtube-nocookie.com).
- [ ] Legendas: incluir `<track kind="captions" src="..." srclang="pt-BR">`
      no `<video>` se o vídeo tiver fala.

### 4. Fotografia

- [ ] **`assets/img/recepcao-referencia.jpg` é foto de TERCEIROS, provisória.**
      Recortada do site de referência (dentopia.marketing, recepção da clínica
      NUYU, Reino Unido), com autorização sua para uso em desenvolvimento. Não
      é licenciada para produção e não mostra o Instituto. Aparece no bloco
      "Sobre" da home e no banner de `sobre.html`, **sem legenda** (a legenda
      "Imagem ilustrativa" foi retirada a seu pedido).
      Trocar pela fachada/recepção real antes de publicar:
      `grep -rn "recepcao-referencia" --include="*.html" .`

- [x] **Foto do hero (borboleta).** A foto da home fica dentro da silhueta da
      borboleta da logo, com a cabeça saindo por cima das asas. Há duas fotos
      prontas: os clínicos (`assets/img/persona-clinicos.webp`, **ativa**) e a
      Isabelle (`assets/img/isabelle-arrivabene.webp`, comentada logo abaixo do
      `<image>` ativo; o `.png` ao lado é a matriz sem perda). Para alternar,
      trocar o `<image>` dentro de `.borboleta` em `index.html` (linha inteira:
      x/y/width/height seguem a proporção de cada arquivo), o href do
      `<link rel="preload">` no `<head>` e o texto do `<title id="borboleta-alt">`
      (é o alt); o comentário no código traz os valores. Outra foto precisa ser
      **recorte em fundo transparente** (WebP ou PNG).

Os 26 arquivos em `assets/img/*.svg` são **placeholders autorais**, recoloridos
para a paleta teal/areia. Cada um traz no próprio SVG, na tag `<desc>`, o
briefing do que a foto real deve mostrar:

```bash
grep -h "<desc>" assets/img/*.svg
```

Slots a fotografar: 5 cursos, 5 ambientes (auditório, clínica, sala,
recepção, laboratório), fachada/recepção, 5 banners, 6 retratos de professor,
4 retratos de aluno.

Ao subir as fotos reais, trocar a extensão nos `src` e **remover os blocos
`.nota-provisoria`** que avisam sobre placeholder.

> **Nota sobre as imagens de referência.** Você pediu para usar fotos da São
> Leopoldo Mandic e do IOA. Eu baixei e avaliei: **todas as fotos usáveis
> daqueles sites carregam a marca de alguém** — o logo do IOA na parede da
> clínica e do auditório, a placa da Mandic na fachada, e logos de terceiros
> (Uniodonto, Henry Schein) nas demais. Publicar qualquer uma colocaria a
> marca de um concorrente dentro do seu site, além do risco autoral. Os cards
> de docente do IOA são pessoas reais e nomeadas — usá-las como seu corpo
> docente seria atribuir associação falsa a indivíduos identificáveis.
> Por isso os placeholders são autorais. As referências continuam valendo
> como referência de composição e conversão, que é onde elas ajudam.

### 5. SEO

- [ ] `og:image` real de 1200×630 em cada página (hoje aponta para um SVG)
- [ ] Trocar o domínio `institutoisabellearrivabene.com.br` nos `canonical`
      e `og:url` se for outro

---

## Estrutura

```
instituto-isabelle-arrivabene/
├── index.html              Home
├── curso-interno.html      Modelo reutilizável de curso
├── sobre.html              Institucional
├── professores.html        Corpo docente com ficha em modal
├── contato.html            Canais + formulário
├── assets/
│   ├── css/
│   │   ├── tokens.css      Paleta, tipografia, espaço, movimento
│   │   ├── base.css        Reset, tipografia, superfícies do navegador
│   │   ├── components.css  Header, botões, fichas, acordeão, carrossel, form
│   │   └── pages.css       Composições de seção
│   ├── js/
│   │   ├── main.js         Header, menu móvel, revelação, voltar ao topo
│   │   ├── components.js   Acordeão, carrossel, filtro, modal, form
│   │   └── vendor/
│   │       └── embla-carousel.umd.js   Embla 8.6.0, original do npm (MIT)
│   ├── img/                26 placeholders autorais + a persona fornecida
│   ├── icons/
│   └── fonts/
├── components/             Parciais compartilhadas (viram get_header etc.)
│   ├── icons.html
│   ├── header.html
│   ├── footer.html
│   └── cta.html
└── .build/                 Montador da fase estática (não vai para produção)
    ├── montar.py
    └── main-*.html
```

### Como editar nesta fase

Header, footer e ícones são **compartilhados**. Editar a parcial em
`components/`, depois reextrair e remontar:

```bash
python3 - <<'PY'
import json
src=open('index.html',encoding='utf-8').read()
def g(a,b):
    i=src.index(a); return src[i:src.index(b,i)]
json.dump({
 'icons':  g("<!-- WP: get_template_part('components/icons') -->", '<!-- WP: Header -->'),
 'header': g('<!-- WP: Header -->', '<main id="conteudo">'),
 'footer': g('<!-- WP: Footer -->', '<script src="assets/js/main.js"'),
}, open('.build/parts.json','w',encoding='utf-8'))
PY
python3 .build/montar.py
```

`index.html` é a fonte de verdade dos blocos compartilhados. O conteúdo
específico de cada página vive em `.build/main-<página>.html`.

---

## Conversão para WordPress

Cada costura já está marcada no HTML. Mapa direto:

| Marcador no HTML | Vira |
|---|---|
| `<!-- WP: Header -->` | `header.php` / `get_header()` |
| `<!-- WP: Footer -->` | `footer.php` / `get_footer()` |
| `<!-- WP: Logo -->` | `the_custom_logo()` |
| `<!-- WP: Menu principal -->` | `wp_nav_menu(['theme_location' => 'principal'])` |
| `<!-- WP: Banner -->` | Campos do Customizer ou ACF por página |
| `<!-- WP: Cursos Loop -->` | `WP_Query` sobre o CPT `curso` |
| `<!-- WP: Docentes Loop -->` | `WP_Query` sobre o CPT `professor` |
| `<!-- WP: Módulos Loop -->` | Campo repetidor `curso_modulos` |
| `<!-- WP: CTA -->` | `get_template_part('components/cta')` |
| `<!-- WP: Newsletter -->` | Plugin de e-mail |
| `<!-- WP: Mapa -->` | Campo do Customizer |

**CPT `curso`** — campos sugeridos: `curso_nivel` (pós-graduação /
aperfeiçoamento), `curso_status` (últimas vagas / matrículas abertas),
`curso_resumo`, `curso_imagem`, `curso_imagem_banner`, `curso_objetivos`,
`curso_publico`, `curso_diferenciais`, `curso_grade`, `curso_modulos`
(repetidor), `curso_docentes` (relação com o CPT `professor`).

**CPT `professor`** — `docente_area`, `docente_bio`, `docente_curriculo`,
`docente_cursos`, foto destacada.

Enfileirar os assets:

```php
wp_enqueue_style('iia-tokens',     get_template_directory_uri().'/assets/css/tokens.css');
wp_enqueue_style('iia-base',       get_template_directory_uri().'/assets/css/base.css',       ['iia-tokens']);
wp_enqueue_style('iia-componentes',get_template_directory_uri().'/assets/css/components.css', ['iia-base']);
wp_enqueue_style('iia-paginas',    get_template_directory_uri().'/assets/css/pages.css',       ['iia-componentes']);
wp_enqueue_script('iia-main',        get_template_directory_uri().'/assets/js/main.js',       [], null, true);
// Embla só na home, onde estão os carrosséis. components.js funciona sem ela.
if (is_front_page()) {
    wp_enqueue_script('embla-carousel', get_template_directory_uri().'/assets/js/vendor/embla-carousel.umd.js', [], '8.6.0', true);
}
wp_enqueue_script('iia-componentes', get_template_directory_uri().'/assets/js/components.js', is_front_page() ? ['embla-carousel'] : [], null, true);
```

A ordem dos CSS importa: `tokens` define as variáveis que os outros três usam.

---

## Decisões que valem conhecer antes de mexer

**Sem preço e sem duração em lugar nenhum.** Decisão sua, aplicada em todo o
site. Toda pergunta comercial vira "Fale com um consultor". Se um valor entrar
depois, ele entra como campo do CPT — não como texto solto.

**Visual: Teal & Areia.** Header e campos de marca em teal `#28797C`, faixas
em areia `#E2CDB0`, leitura em creme `#F8EDDB`; títulos em Raleway caixa alta,
texto em Manrope — seguindo a referência que você enviou. Sistema completo em
`../DESIGN.md`.

**Cor por campo, nunca por componente.** Cada `<section>` recebe um campo
(`campo-teal`, `campo-areia`; creme é o padrão) e os componentes leem os papéis
(`--txt`, `--titulo`, `--acao-bg`…). Para trocar o fundo de uma seção, troque a
classe da seção — não o CSS do botão.

**Areia sobre teal só em texto grande.** Areia sobre `#28797C` mede 3,3:1:
serve para a palavra de destaque do título, bordas, ícones e fundo de botão.
Texto pequeno sobre teal é branco ou `--creme-texto`. Texto sobre areia é
sempre `--teal-profundo` (4,7:1).

**O header é sempre teal sólido**, com dropdown creme em "Cursos". O botão de
menu aparece em todas as larguras e abre uma gaveta lateral.

**Nada depende de JavaScript para existir.** Sem JS: o menu vira lista inline,
os acordeões ficam todos abertos, o conteúdo continua legível. Manter assim.

**Movimento respeita `prefers-reduced-motion`.** Toda animação é desligada
para quem pediu isso no sistema.

---

## Rodar localmente

```bash
python3 -m http.server 8000
# abrir http://localhost:8000
```

Precisa de servidor: os ícones usam `<use href="#id">`.
Abrir por `file://` funciona parcialmente, mas não é representativo.

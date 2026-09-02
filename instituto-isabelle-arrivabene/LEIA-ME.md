# Instituto Isabelle Arrivabene — site institucional

HTML + CSS + JavaScript puro. Zero framework CSS, zero biblioteca JS.
Estruturado para virar tema WordPress sem retrabalho.

---

## ⚠️ Lista obrigatória de substituição antes de publicar

Nada abaixo é invenção minha: são os pontos onde não havia informação
confirmada. Cada um está marcado no código com um comentário `SUBSTITUIR`.

Para localizar todos de uma vez:

```bash
grep -rn "SUBSTITUIR" --include="*.html" .
```

### 1. Logo (bloqueante)

O símbolo da borboleta **não foi redesenhado** — recriar de olho uma marca
existente produziria uma versão pior dela. O lockup roda apenas tipográfico
até o vetor chegar.

- [ ] Salvar o vetor oficial em `assets/img/logo-borboleta.svg`
- [ ] Em `components/header.html` e `components/footer.html`, descomentar a
      linha `<img class="marca__glifo" ...>` (o comentário está logo acima)
- [ ] Repetir nas 6 páginas montadas (ou rodar `python3 .build/montar.py`
      depois de ajustar `components/`)

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
| Footer, contato | Embed de mapa do endereço exato (hoje aponta para a Península como aproximação) |
| Footer | Links reais de política de privacidade e termos de uso |

### 3. Conteúdo de exemplo, rotulado como tal no site

Estes blocos existem para dimensionar o layout e **estão marcados na página**
com o aviso "Conteúdo de exemplo". Remover o aviso junto com o conteúdo.

- [ ] **Depoimentos** (home) — 4 textos de exemplo. Substituir por depoimentos
      reais e autorizados, ou remover a seção.
- [ ] **Professores** (home, cursos, curso-interno, professores) — 6 perfis de
      exemplo. Substituir por nomes, especialidades, currículos e fotos reais.
- [ ] **Linha do tempo** (sobre) — marcos sem ano, porque nenhuma data foi
      confirmada. Preencher ou remover a seção.

### 4. Fotografia

Os 26 arquivos em `assets/img/*.svg` são **placeholders autorais**, desenhados
no mundo visual do projeto. Cada um traz no próprio SVG, na tag `<desc>`, o
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
- [ ] Favicon (`assets/icons/`)

---

## Estrutura

```
instituto-isabelle-arrivabene/
├── index.html              Home
├── cursos.html             Catálogo (a página de maior peso de conversão)
├── curso-interno.html      Modelo reutilizável de curso
├── sobre.html              Institucional
├── professores.html        Corpo docente com busca e ficha em modal
├── contato.html            Canais + formulário
├── assets/
│   ├── css/
│   │   ├── tokens.css      Paleta, tipografia, espaço, movimento
│   │   ├── base.css        Reset, tipografia, superfícies do navegador
│   │   ├── components.css  Header, botões, fichas, acordeão, carrossel, form
│   │   └── pages.css       Composições de seção
│   ├── js/
│   │   ├── main.js         Header, menu móvel, revelação, voltar ao topo
│   │   └── components.js   Acordeão, carrossel, filtro, busca, modal, form
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
wp_enqueue_script('iia-componentes', get_template_directory_uri().'/assets/js/components.js', [], null, true);
```

A ordem dos CSS importa: `tokens` define as variáveis que os outros três usam.

---

## Decisões que valem conhecer antes de mexer

**Sem preço e sem duração em lugar nenhum.** Decisão sua, aplicada em todo o
site. Toda pergunta comercial vira "Fale com um consultor". Se um valor entrar
depois, ele entra como campo do CPT — não como texto solto.

**O ouro é o único elemento com permissão de acender.** É o sistema de estado
do site: matrícula aberta acende por dentro, "últimas vagas" intensifica o
halo na aresta superior da ficha. Se você adicionar um brilho dourado
decorativo em outro lugar, o sistema para de comunicar estado.

**Texto sobre champanhe é sempre espresso, nunca branco.** Branco sobre
`#B29A6E` mede 2,7:1 e reprova em acessibilidade. Para o raro caso que exige
texto branco existe o `--ouro-fundo` (`#8A6E42`, 4,8:1).

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

Precisa de servidor: os ícones usam `<use href="#id">` e o filtro lê a URL.
Abrir por `file://` funciona parcialmente, mas não é representativo.

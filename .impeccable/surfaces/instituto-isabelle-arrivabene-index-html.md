---
version: 1
slug: "instituto-isabelle-arrivabene-index-html"
primary_target: "instituto-isabelle-arrivabene/index.html"
related_targets: ["instituto-isabelle-arrivabene/cursos.html","instituto-isabelle-arrivabene/curso-interno.html","instituto-isabelle-arrivabene/sobre.html","instituto-isabelle-arrivabene/professores.html","instituto-isabelle-arrivabene/contato.html"]
---

## Escopo

Site institucional completo do Instituto Isabelle Arrivabene, seis superfícies estáticas (`index`, `cursos`, `curso-interno`, `sobre`, `professores`, `contato`) em HTML/CSS/JS puro, estruturado para conversão posterior em tema WordPress. Modo do visitante: **Persuade** em todas as superfícies — inclusive `sobre` e `professores`, que existem como prova de credibilidade a serviço da matrícula, não como páginas de leitura.

## Público, tarefa, ação

Dentista brasileiro em atividade clínica, decidindo no celular entre atendimentos, comparando duas ou três instituições. A ação é uma só: iniciar conversa sobre um curso nomeado, por WhatsApp ou formulário. Não há transação no site.

Prova disponível: corpo docente, estrutura física no Champs Mall, status real de matrícula por curso. Prova ausente e não inventável: preço, duração, data de início, carga horária, reconhecimento MEC, depoimentos reais, nomes reais de professores.

## Restrições

- Sem preço e sem duração em nenhuma superfície. Toda pergunta comercial vira "Fale com um consultor".
- Contatos, depoimentos e bios de professores são placeholder/sintéticos rotulados, cada um com `<!-- SUBSTITUIR -->`.
- Imagens vindas dos sites de referência são de terceiros e temporárias; cada arquivo registra origem e entra na lista obrigatória de troca antes de publicar.
- Zero framework CSS e zero biblioteca JS.
- Costuras WordPress marcadas com `<!-- WP: ... -->`.

## Direção escolhida

**Camada Cerâmica** (seed `d3bb9c1b`, candidata 5 de 7, code-led). A estratificação da cerâmica dental é o sistema: núcleo de dentina opaco, camada de esmalte translúcida por cima, luz atravessando as duas. Campos de azul-petróleo profundo alternam com campos de marfim de dentina — a alternância *é* a estratificação, e resolve "branco predominante" sem abrir mão de cor em escala de página.

Quatro elevações herdadas das mãos que perdeu:

- **Luz transmitida é o sistema de estado inteiro** (de Akari). Matrícula aberta acende por dentro; "últimas vagas" intensifica o halo incisal; nada mais na página brilha.
- **Figura monumental cortada pelas bordas** (de Linóleo). O recorte clínico domina o primeiro viewport visto de baixo, nunca reduzido a um hero polido.
- **Estações com consequência e prévia** (de Câmara Escura). A matrícula é sequência real, não quatro círculos numerados.
- **Cada curso endereçável, trilha retraçável** (de HyperCard). Deep link por curso e por seção.

## Momento memorável

O halo incisal. Em campo escuro, cada curso carrega na aresta superior a faixa opalescente azul-acinzentada que todo dentista reconhece como translucidez de esmalte — e é ela, e só ela, que informa o estado da matrícula: intensa e âmbar em "últimas vagas", fria e discreta em "matrículas abertas".

## Decisões em aberto

- Fontes reais dos dados comerciais (preço, duração, datas) — o usuário decide se e quando entram.
- Fotografia própria da estrutura e do corpo docente — obrigatória antes de publicar.
- Logo definitiva; o wordmark atual é autoral e temporário.

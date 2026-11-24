# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

HTML + CSS + JavaScript puro. **Proibido:** Bootstrap, Tailwind, qualquer framework CSS, qualquer biblioteca JS (jQuery, GSAP, Swiper, AOS incluídos). Accordion, scroll reveal e menu mobile são escritos à mão. Decisão explícita do usuário, reafirmada.

**Única exceção (2026-11-24, decisão do usuário):** **Embla Carousel 8.6.0** (MIT, ~7 KB gzip, sem CSS próprio) nos carrosséis da home, servida localmente em `assets/js/vendor/embla-carousel.umd.js` (sem CDN). Escolhida entre Embla, Swiper (44 KB + CSS) e Splide (sem release desde 2022) por ser leve e não impor visual. O carrossel continua funcionando sem ela (scroll-snap nativo). Nenhuma outra lib entra sem nova decisão do usuário.

Structured for a later conversion to a WordPress theme: separated CSS/JS, reusable partials under `components/` destined to become `get_header()` / `get_footer()`, and `<!-- WP: ... -->` markers at every future template seam.

## Users

Primary: practicing dentists in Brazil (typically 25–40, already graduated, clinically active) looking for a *pós-graduação* or *aperfeiçoamento* to raise their clinical ceiling and their earning power. They evaluate on a phone, often between appointments, comparing two or three institutions at once. The decision is high-consideration and expensive in time and money, and it is frequently made regionally: a São Luís / Maranhão professional who does not want to relocate to São Paulo to study with recognized faculty.

Secondary: recent graduates choosing a first specialization, and clinic owners sending staff for training.

## Product Purpose

Instituto Isabelle Arrivabene sells graduate-level dental education. The site's job is enrollment: make each course intelligible, make the faculty and physical structure credible, and get the visitor into a contact/enrollment conversation. Success is a qualified inquiry — a WhatsApp message or form submission naming a course.

## Positioning

Nationally recognized faculty and a premium physical structure, available locally in São Luís/MA. The claim a neighboring institution could not truthfully copy is the combination: this level of instruction, at Champs Mall / Península, without leaving Maranhão. "Aprenda com quem vive a prática clínica" — practice-first instruction, not academic theory.

## Operating Context

- Physical location: Champs Mall, Península, São Luís – MA. This is confirmed product truth and appears throughout the site.
- Visitors arrive mostly from Instagram and paid social, mobile-first, mid-scroll. Depth of reading is low on arrival and high once a specific course captures them.
- The commercial conversation happens on WhatsApp. The site does not transact; it hands off.
- No backend in this phase: forms and filters are front-end only.

## Capabilities and Constraints

Course catalog (confirmed, with confirmed enrollment status):

| Course | Level | Status |
|---|---|---|
| Harmonização Orofacial | Pós-graduação | Últimas vagas |
| Ortodontia e Ortopedia Facial | Pós-graduação | Matrículas abertas |
| Prótese Dentária | Pós-graduação | Matrículas abertas |
| Implantodontia | Pós-graduação | Matrículas abertas |
| Dentística Restauradora | Aperfeiçoamento | Matrículas abertas |

Surfaces to ship: `index.html`, `curso-interno.html`, `sobre.html`, `professores.html`, `contato.html`.

Explicitly undecided — must not be invented as fact:

- **Pricing and duration.** User decision: the site carries **no prices and no course durations**. Every commercial question routes to a "Fale com um consultor" CTA. Do not add a tuition table, an installment figure, or a month count anywhere.
- **Start dates.** Not stated. Status badges carry urgency instead ("Últimas vagas" / "Matrículas abertas").
- **Contact details.** Phone, WhatsApp number, Instagram/Facebook/LinkedIn handles, CNPJ, e-mail: none confirmed. Ship as visibly marked placeholders, each with a `<!-- SUBSTITUIR -->` comment, and deliver the replacement list. Street address stays at the confirmed level of detail (Champs Mall, Península, São Luís – MA).
- **Accreditation / MEC recognition.** Not confirmed. Do not claim credential recognition, course-hour counts, or a certifying body.
- **Faculty roster.** No real names confirmed.

## Brand Commitments

- Name: **Instituto Isabelle Arrivabene**.
- Confirmed institutional copy (use as written): "O Instituto Isabelle Arrivabene oferece pós-graduações e aperfeiçoamentos pensados para profissionais que buscam evolução real na odontologia, unindo excelência acadêmica, prática clínica e professores reconhecidos nacionalmente. Localizado no Champs Mall, na Península, em São Luís, proporciona uma experiência de ensino moderna e exclusiva."
- Confirmed positioning lines: "Formação avançada em Odontologia e Harmonização Facial." / "Aprenda com quem vive a prática clínica."
- Language: Brazilian Portuguese throughout.
- **Logo (confirmed, binding).** A butterfly formed by two mirrored facial profiles, in warm gold line, beside a stacked wordmark: `INSTITUTO` in wide-tracked caps above `ISABELLE` / `ARRIVABENE` in a light high-contrast serif. The mark reads as facial harmonization, which is the flagship course — it is the identity's strongest asset and must not be redrawn or restyled. **Redrawn as vector on 2026-11-24 at the user's request** from the supplied logo image (`assets/img/logo-instituto.svg`, gold `#C29762`; screen variant `logo-instituto-areia.svg` for teal; symbol `logo-borboleta.svg`). The wordmark is Bellefair outlined with a custom wavy-crossbar A, and "INSTITUTO" is Raleway. If the official vector surfaces, it supersedes this redraw.
- **Palette (confirmed, binding — revised 2026-11-24).** The user replaced the earlier espresso/champagne palette with the look of a reference page they supplied (dentopia.marketing, NUYU case study), asking explicitly for its header color, text colors and fonts:
  - Teal `#28797C` — header (always solid) and brand fields
  - Deep teal `#1F5F61` — headings on light fields, text on sand
  - Sand `#E2CDB0` — primary buttons on teal, bands, frames
  - Cream `#F8EDDB` — the light reading field
  - Text `#2B2D2A`
  - Contrast note: sand on teal measures 3.3:1, so sand carries only large text, borders, icons and button fills; small text on teal is white or near-white.
  - Superseded: "No blue anywhere" and the espresso/champagne values no longer apply.
- **Typography (confirmed 2026-11-24).** Raleway (headings, uppercase, open tracking) + Manrope (body), as on the reference. The wordmark keeps its own serif.
- **Register (confirmed).** Elegant, luxury, a select audience — a premium health studio, executed as whole fields of teal, sand and cream rather than a pale page with an accent.
- `persona_v2.avif` is a transparent-background cutout of two clinicians — an image asset, not a color source.

## Evidence on Hand

- `persona_v2.avif` — transparent-background cutout of two clinicians in lab coats. Real asset, usable.
- **No real testimonials, student outcomes, faculty names, alumni counts, or press.** User decision: testimonials and faculty bios ship as **high-fidelity synthetic example content, each labeled as such in the markup** and listed for replacement. They are never presented as verified statements from real people. (2026-11-24: at the user's request the visible "Conteúdo de exemplo" notice on the home testimonials was removed; a SUBSTITUIR comment and the "· exemplo" tag in each card remain, and replacing them before launch stays mandatory.)
- **No photography of the actual facility.** User decision, after the third-party risk was raised and reaffirmed: imagery is sourced from the reference sites (São Leopoldo Mandic, IOA) as **temporary third-party placeholders**. Every such file is recorded with its origin and is on a mandatory pre-publication replacement list. This is not licensed for production use.
- `assets/img/recepcao-referencia.jpg` — **temporary third-party placeholder**, cropped from `dentopia.marketing/nuyu-case-banner.png` (a UK clinic's reception, no people, no logos; the "Award shortlisted" badge baked into the original was cropped out because it would imply an award the Institute never received). Used on the home "Sobre" block and the Sobre banner; the visible "Imagem ilustrativa" caption was removed at the user's request (2026-11-24), so only the code comment and LEIA-ME flag it. On the mandatory replacement list. The other images on that page were declined: they carry the NUYU brand or show identifiable real people (staff, a child patient, a dentist), which would read as false association.
- Reference sites for composition and conversion benchmark: `conteudo.slmandic.edu.br/pos-graduacao-odonto-2026`, `slmandic.edu.br`, `redeioa.com.br`.

## Product Principles

1. **The course is the product; the institution is the proof.** Every surface routes toward a specific course, and faculty/structure exist to make that course believable.
2. **Never invent a commercial fact.** No price, duration, hour count, start date, accreditation, or outcome statistic enters the site without the user confirming it. Urgency comes from real enrollment status, never from a fabricated deadline.
3. **The phone is the primary device.** A visitor deciding mid-scroll on mobile must reach WhatsApp or a course page in one deliberate action from anywhere.
4. **Premium means restraint and specificity, not ornament.** Credibility in health education is earned by precision and space, not by saturation or stock enthusiasm.
5. **Every seam anticipates WordPress.** Nothing ships that would have to be rebuilt to become a template, a loop, or a custom field.

## Accessibility & Inclusion

No client-specific standard was established. Build to the craft floor: semantic landmarks, ≥4.5:1 body contrast, visible keyboard focus, real labels on every form control, and `prefers-reduced-motion` honored.

# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

HTML + CSS + JavaScript puro. **Proibido:** Bootstrap, Tailwind, qualquer framework CSS, qualquer biblioteca JS (jQuery, GSAP, Swiper, AOS incluídos). Carousel, accordion, scroll reveal e menu mobile são escritos à mão. Decisão explícita do usuário, reafirmada. Structured for a later conversion to a WordPress theme: separated CSS/JS, reusable partials under `components/` destined to become `get_header()` / `get_footer()`, and `<!-- WP: ... -->` markers at every future template seam.

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

Surfaces to ship: `index.html`, `cursos.html`, `curso-interno.html`, `sobre.html`, `professores.html`, `contato.html`.

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
- **Logo (confirmed, binding).** A butterfly formed by two mirrored facial profiles, in warm gold line, beside a stacked wordmark: `INSTITUTO` in wide-tracked caps above `ISABELLE` / `ARRIVABENE` in a light high-contrast serif. The mark reads as facial harmonization, which is the flagship course — it is the identity's strongest asset and must not be redrawn or restyled. **The vector file has not been delivered yet**; the build ships the typographic lockup faithfully and reserves a marked slot for `assets/img/logo-borboleta.svg`.
- **Palette (confirmed, binding).** Sampled from the official piece and the logo, and it overrides any palette the design process would otherwise derive:
  - Champagne / warm gold — `#B29A6E` (the official piece's bar), logo gold `#A98A57`
  - Warm greige ground — `#F3F0EC`, with `#EAE4DB` and `#DCD3C7`
  - Warm gray text — `#6B645C`
  - Deep espresso for contrast and dark fields — `#201A14`
  - **No blue anywhere.** The palette is entirely warm.
  - Contrast note: white on `#B29A6E` measures 2.7:1 and fails WCAG, so the system sets espresso text on champagne (6.3:1) and reserves the deeper `#8A6E42` for the rare case that needs white text (4.8:1).
- **Register (confirmed).** Elegant, luxury, a select audience. Executed as real contrast and commitment — deep espresso fields against greige, champagne at page scale — not as a pale page with a gold detail.
- `persona_v2.avif` is a transparent-background cutout of two clinicians — an image asset, not a color source.

## Evidence on Hand

- `persona_v2.avif` — transparent-background cutout of two clinicians in lab coats. Real asset, usable.
- **No real testimonials, student outcomes, faculty names, alumni counts, or press.** User decision: testimonials and faculty bios ship as **high-fidelity synthetic example content, each labeled as such in the markup** and listed for replacement. They are never presented as verified statements from real people.
- **No photography of the actual facility.** User decision, after the third-party risk was raised and reaffirmed: imagery is sourced from the reference sites (São Leopoldo Mandic, IOA) as **temporary third-party placeholders**. Every such file is recorded with its origin and is on a mandatory pre-publication replacement list. This is not licensed for production use.
- Reference sites for composition and conversion benchmark: `conteudo.slmandic.edu.br/pos-graduacao-odonto-2026`, `slmandic.edu.br`, `redeioa.com.br`.

## Product Principles

1. **The course is the product; the institution is the proof.** Every surface routes toward a specific course, and faculty/structure exist to make that course believable.
2. **Never invent a commercial fact.** No price, duration, hour count, start date, accreditation, or outcome statistic enters the site without the user confirming it. Urgency comes from real enrollment status, never from a fabricated deadline.
3. **The phone is the primary device.** A visitor deciding mid-scroll on mobile must reach WhatsApp or a course page in one deliberate action from anywhere.
4. **Premium means restraint and specificity, not ornament.** Credibility in health education is earned by precision and space, not by saturation or stock enthusiasm.
5. **Every seam anticipates WordPress.** Nothing ships that would have to be rebuilt to become a template, a loop, or a custom field.

## Accessibility & Inclusion

No client-specific standard was established. Build to the craft floor: semantic landmarks, ≥4.5:1 body contrast, visible keyboard focus, real labels on every form control, and `prefers-reduced-motion` honored.

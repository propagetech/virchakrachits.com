# Redesign decisions — Virchakra Chits Pvt Ltd

## Business & buyer
Registered chit fund company in Bangalore (Basavanagudi), established 1990 (35+ years). Sells
regulated chit-fund savings/borrowing schemes (chit value 1L–25L, 25–50 month terms) to salaried
individuals, small traders and families who want disciplined monthly savings with the option to
bid for a lump sum when they need it (school fees, medical, business capital, home renovation).
Primary action: enquire by phone/WhatsApp/email about a scheme, or ask "which chit value suits my
budget". Buyer objections (from the old FAQ, real and worth answering head-on):
- "Is my money safe? Are chit funds a scam?"
- "Are you a registered/legal company or an unorganised operator?"
- "What if I need to withdraw partway through?"
- "How is this better than a bank RD or mutual fund?"
- "What securities/guarantees do I need to submit?"

## Real contact facts (verified from old site, nothing invented)
- Legal name: M/S. Virchakra Chits Pvt Ltd. Established 1990.
- Address: No. 64, 1st Floor, Maruthi Plaza, D. V. G. Road, Basavanagudi, Bangalore 560004.
- Phone: +91 97416 17714 | 080 2242 9975 | 4120 4708
- Email: chitsvirchakra@gmail.com
- Domain (from sitemap): virchakrachits.com -> canonical https://www.virchakrachits.com/
- No verified WhatsApp-enabled number -> no wa.me link, tel: + mailto: only.
- No social profiles referenced beyond generic FA icons (no real handles found) -> omit fabricated
  social links.
- No verifiable ISO/MSME/registration numbers on the old site beyond "Registered Chit Fund Company"
  claim -> keep that claim (it's their own existing public claim) but do NOT invent a registration
  number; add a build-standards strip instead of fabricated credential badges.

## Competitor scan (live web, Bangalore chit-fund market)
- **Margadarsi Chit Fund** — since 1962, 60+ years, huge trust brand, 29 Karnataka branches,
  turnover scale. Owns "decades of trust" positioning.
- **MSIL Chits** — Government of Karnataka undertaking (est. 1966, chits since 2005). Owns
  "government-backed" positioning.
- **MCI (Bangalore) Chits Ltd** — government-recognised, est. 1999.
- **Daasharathi Chits** — markets itself as "no loans, fully transparent" registered chit plans.
- **Sri Muneshwara Chits** and others — compete mainly on reviews/ratings and branch count.

**Gap list (things most listings omit that Virchakra can own):**
1. None of the scanned competitors publish actual chit-value / duration / installment numbers in
   public listings — Virchakra's own scheme table (real numbers, already public on the old site) is
   a genuine transparency differentiator; keep it prominent instead of hiding pricing behind "enquire".
2. Doorstep collection "free of cost" (stated on the old site) is a concrete, statable convenience
   most competitor pages don't lead with.
3. A plain-English "How a chit works" walkthrough with real arithmetic (already written) is more
   useful than most competitor FAQ pages, which stay abstract.

**How we differ (one paragraph):** Virchakra is a single-branch, family-run Basavanagudi chit
fund with 35 years of continuous operation, not the biggest network in the city, but the most
transparent about numbers: real scheme values and installments published up front, doorstep
collection at no extra cost, and a plain-English explanation of exactly how the bidding and
dividend math works, so a first-time subscriber can decide without having to call and ask.

## Keyword -> page map
| Keyword cluster | Page | Where used |
| --- | --- | --- |
| chit fund company Basavanagudi / Bangalore, registered chit fund Bangalore | Home | title, h1, meta desc, schema areaServed |
| chit fund schemes, chit value and installment amount | Schemes | title, h1, table, alt, FAQ |
| how does a chit fund work, chit fund bidding process, chit fund dividend | How it works | title, h1, body, schema |
| is chit fund safe, chit fund vs bank RD, chit fund tax benefit | FAQ | title, h1, FAQPage schema |
| chit fund company Basavanagudi contact, chit fund near D.V.G. Road | Contact | title, h1, LocalBusiness schema |
| Virchakra Chits, chit fund since 1990, registered chit fund company | About | title, h1, body |

## Lead-gen IA
Home, About, Schemes, How it works, FAQ, Contact. (Same set as the old site — it already matches
the buyer journey: what/who -> proof of legitimacy -> real numbers -> how the math works -> objection
handling -> contact.) Every page: one job, one primary CTA ("Enquire about a scheme" mailto starter),
secondary CTA (call). Contact stays email/tel led, no form, no fabricated WhatsApp.

## Art-direction brief
- **Register:** Editorial / authority (financial trust vertical) — composed, restrained, credible;
  not a flashy fintech, not a builder site.
- **Palette source:** logo navy (#0b2545-ish deep navy dharma-wheel emblem) + warm off-white field +
  a single muted gold/brass accent (evokes the coin/prosperity theme honestly, without gimmick).
- **Type pairing:** Source Serif 4 (headings) + Inter (body) — high-contrast serif for authority,
  neutral grotesk for scanability and numbers (scheme tables).
- **Motion:** restrained — soft fades on scroll reveal, no parallax, no gradient glows (that reads
  as fintech-startup, wrong register for a 35-year-old regulated savings company).
- **Signature element:** the logo's dharma-wheel emblem echoed as a faint oversized watermark behind
  the hero/section dividers, plus a distinct "numbered ledger" styling for the scheme table and the
  how-it-works walkthrough (monospace-tabular figures for money amounts).

## Imagery plan
No verified real project/office photos exist (old site used generic stock: hands together, coins,
trees-on-coins, generic "people" illustrations). None carry competitor branding. Reuse the existing
generic finance-themed stock photos (hero background, split sections) since they are decorative,
not claiming to depict "our branch" or "our subscribers" — captions/alt stay generic and honest
("hands joined in partnership", not "our team"). Real branch/team photos flagged under
needs-owner-input for a future swap.

## Flagged discrepancy (needs owner confirmation)
The old site shows two different mobile numbers in two places: `+91 97416 17714` on the dedicated
Contact page (used throughout this rebuild as the primary mobile) and `+91 99164 02505` in an embedded
contact-form widget on the old homepage only. Both cannot be verified as current from the archive alone.
The rebuild uses the Contact-page number everywhere; confirm with the owner which mobile number is
correct before go-live and update the site + schema if the widget number is the live one instead.

## Credentials & compliance
Publish only the build-standards strip (WCAG 2.1 AA, no cookies/tracking, HTTPS, self-hosted) plus
the pre-existing public claim "Registered Chit Fund Company" (already the client's own claim, not
new). No registration numbers, ISO marks, or specific regulator citations are invented.

## Standards
Directory URLs, path-portable relative assets, one css/main.css + js/main.js, self-hosted Source
Serif 4 + Inter woff2 from Fontsource, WCAG 2.1 AA audited, schema.org (Organization/FinancialService
+ WebSite + WebPage + FAQPage + BreadcrumbList), no em/en dashes, mailto enquiry starters + tel:,
old site archived to archive/.

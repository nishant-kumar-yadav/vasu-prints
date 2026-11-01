# VasuPrint — Website Content

All public copy for v1. Agents transcribe this file into `src/content/**` (typed, validated by zod) and `src/content/policies/*.md`. **Do not invent new claims.** Copy marked as owner-approved comes from the owner's content brief and must not be reworded; everything else was written for this project and may be edited for fit, but its meaning must stay the same.

Token syntax: `{{business.field}}` is replaced at render time from `src/config/business.ts` (see `ARCHITECTURE.md` §9.1). While a value is a placeholder, the UI renders "—" (dev) and the production build fails.

Spelling: follow the owner's copy ("customized", "labeling", "color").

---

## 1. Global copy

### 1.1 Header

- Nav: Products · About Us · Contact Us · **Get a Quote**
- Mega-menu promo card: **Not sure what you need?** / Share your requirement and we'll suggest the right material and finish. / _Get a Quote →_

### 1.2 Trust strip (hero ticks; reused in category heroes)

- Custom sizes
- Bulk orders
- Artwork support
- Pan-India dispatch

### 1.3 Our process (owner-approved)

1. **Share Your Requirements** — Tell us about your product, size and quantity.
2. **Get a Quotation** — Receive pricing based on your specifications.
3. **Design & Approval** — Share your artwork and confirm the requirements.
4. **Production** — Your order moves into the production process.
5. **Dispatch** — Delivery arrangements are coordinated according to your order.

Section header: eyebrow **HOW IT WORKS** · h2 **Our Process** · lead _From requirement to dispatch in five clear steps._

### 1.4 CTA blocks (owner-approved)

- **Main CTA band:** h2 _Looking for Custom Printing & Packaging Solutions?_ · text _Tell us what you need. Our team will help you find the right printing or packaging solution for your business._ · button **Request a Free Quote** · secondary **Chat on WhatsApp**
- **Product CTA band:** h2 _Need Custom Sizes, Materials or Printing?_ · text _Every business has different requirements. Share your specifications and let us help you find the right solution._ · button **Get Custom Quotation**
- **Category CTA band:** h2 _Need custom {category name, lowercase}?_ · text _Share your size, material and quantity — we'll send a quotation._ · button **Get a Quote**

### 1.5 Footer (owner-approved)

- Brand line: _Your destination for customized printing, packaging, stickers and branding solutions._
- **Quick Links:** Home · About Us · Products (→ `/#products`) · Contact Us · Get a Quote
- **Our Products:** Packaging Boxes · Stickers · DTF Stickers · UV DTF Stickers · Tags
- **Contact Information:** Phone {{business.phoneDisplay}} · Email {{business.email}} · Address {{business.address}}
- Legal row: © {current year} VasuPrint. All Rights Reserved. · Privacy Policy · Terms & Conditions · Shipping Policy · Refund Policy · GSTIN {{business.gstin}}

### 1.6 WhatsApp texts

See `API.md` §6.

---

## 2. Home page

### 2.1 Hero (owner-approved)

- Eyebrow: **CUSTOM PRINTING & PACKAGING**
- H1: **Printing & Packaging Solutions That Make Your Brand Stand Out.**
- Text: _At VasuPrint, we provide customized printing, packaging and labeling solutions designed to help businesses create a strong brand identity. From premium packaging boxes to custom stickers, DTF transfers and product tags, we deliver solutions tailored to your business requirements._
- Buttons: **Get a Quote** · **Explore Products** (→ `#products`)
- Image alt: _Custom printed cartons, label rolls, DTF transfer sheet and hang tags arranged on a light grey surface_

### 2.2 Introduction (owner-approved)

- Eyebrow: **WHO WE ARE**
- H2: **Your Trusted Partner for Custom Printing & Packaging**
- P1: _VasuPrint is your one-stop destination for customized printing and packaging solutions. We specialize in providing a wide range of products for businesses, brands, manufacturers, retailers and distributors._
- P2: _Whether you need custom packaging boxes, high-quality stickers, DTF transfers or personalized tags, we focus on delivering products according to your specifications, material preferences and quantity requirements._
- Link: **About VasuPrint →**

### 2.3 Product categories (`id="products"`)

- Eyebrow: **WHAT WE MAKE** · H2: **Our Product Categories** · lead: _Five product families, each made to your size, material and quantity._
- Cards use category `name` + `tagline` (§5).

### 2.4 Why choose VasuPrint (owner-approved)

- Eyebrow: **WHY VASUPRINT** · H2: **Printing Solutions Designed Around Your Business**

| Icon (lucide)       | Title                      | Body                                                |
| ------------------- | -------------------------- | --------------------------------------------------- |
| `Ruler`             | Customized Solutions       | Products made according to your requirements.       |
| `LayoutGrid`        | Multiple Product Options   | A wide range of printing and packaging products.    |
| `Boxes`             | Bulk Order Support         | Solutions for businesses requiring bulk quantities. |
| `BadgeCheck`        | Quality-Focused Production | Attention to printing, materials and finishing.     |
| `SlidersHorizontal` | Custom Specifications      | Options for size, material and design requirements. |
| `MessageSquareText` | Easy Enquiry Process       | Connect with us for quotations and product details. |

### 2.5 Our process — §1.3

### 2.6 Featured products

- Eyebrow: **POPULAR PRODUCTS** · H2: **Built for brands that ship** · link: _View all products_
- Featured: Mono Carton Boxes, Paper Gumming Stickers, DTF Transfer Stickers, Custom Hang Tags.

### 2.7 Capabilities

- Eyebrow: **CAPABILITIES** · H2: **Materials, finishes and formats we work with**
- Text: _Tell us how your product will be used and we'll recommend the right board, film and finish. Every option below can be combined to suit your brand and budget._
- Boards & papers: SBS board · Duplex board · Art card · Kraft card · Chromo paper · Mirrorcoat paper
- Films & transfers: White vinyl · Transparent vinyl · PVC film · Metallic film · DTF PET film · UV DTF film
- Finishes: Matte lamination · Gloss lamination · Soft-touch lamination · Spot UV · Hot foil stamping · Embossing & debossing · Die-cutting · Aqueous / UV varnish

### 2.8 CTA band — §1.4 main.

---

## 3. About page

- Eyebrow: **ABOUT VASUPRINT**
- H1 (owner-approved): **Your Partner in Printing, Packaging & Branding Solutions**
- Lead (owner-approved): _VasuPrint is focused on providing customized printing, packaging and labeling solutions for businesses of different sizes._
- Story (owner-approved):
  - _We understand that packaging and printed materials play an important role in product presentation and brand identity. That's why we offer a diverse range of products, including packaging boxes, stickers, DTF transfers, UV DTF stickers and customized tags._
  - Highlight: _Our goal is to make it easier for businesses to find suitable printing solutions under one roof._
- **Our Mission** (owner-approved): _To provide customized printing and packaging solutions that help businesses improve product presentation, strengthen brand identity and meet their packaging requirements._
- **Our Vision** (owner-approved): _To become a trusted name in the printing and packaging industry through customer-focused service, product variety and consistent quality._
- What we make: H2 **One partner for boxes, stickers, transfers and tags** — 5 category mini-cards.
- How we work: H2 **How we work with you**

| Icon             | Title                    | Body                                                                                    |
| ---------------- | ------------------------ | --------------------------------------------------------------------------------------- |
| `Handshake`      | Customer-focused service | We start with how your product is used, then recommend materials and finishes that fit. |
| `Layers`         | Product variety          | Packaging, labels, transfers and tags from a single team — fewer suppliers to manage.   |
| `ShieldCheck`    | Consistent quality       | Every order follows an approved specification and artwork proof before production.      |
| `MessagesSquare` | Clear communication      | Quotations, proofs and dispatch updates shared on WhatsApp or email.                    |

- CTA band — §1.4 main.

---

## 4. Contact page

- Eyebrow: **CONTACT US**
- H1 (owner-approved): **Let's Discuss Your Printing Requirements**
- Text (owner-approved): _Looking for custom packaging boxes, stickers, DTF transfers or product tags? Get in touch with VasuPrint. Share your requirements, and our team will assist you with product options and quotation details._
- Contact rows: Phone {{business.phoneDisplay}} (Call) · WhatsApp {{business.whatsappE164}} (Chat on WhatsApp) · Email {{business.email}} (Send email) · Address {{business.address}} (Get directions → {{business.mapsUrl}}) · Business hours {{business.businessHours}}
- Compact form heading: **Send us a message** · sub: _For artwork uploads, use the full quote form._ (link)
- Map placeholder button: **Load map**

---

## 5. Category pages

Owner-approved headings and intros are marked ★.

### 5.1 Packaging Boxes — `/packaging-boxes`

- name: **Packaging Boxes** · tagline: _Custom packaging boxes designed to protect your products and enhance your brand presentation._ ★
- heading ★: **Custom Packaging Boxes for Every Business Need**
- intro:
  1. ★ _Make your products look professional with customized packaging boxes. Choose from different materials, sizes and printing options according to your requirements._
  2. _We print folding cartons on mono carton, SBS and duplex board — from economical everyday packaging to premium retail boxes with foil, spot UV and embossing. Share your product dimensions and quantity, and we'll recommend the right board and box style._
- highlights:
  - `Ruler` **Made to your dimensions** — Boxes sized to your product, with styles such as tuck-end, crash-lock bottom and sleeves.
  - `Palette` **Print that sells** — Full-color offset printing with Pantone matching for brand-consistent packaging.
  - `Sparkles` **Premium finishes** — Lamination, spot UV, foil stamping and embossing to lift your shelf presence.
  - `Boxes` **Bulk-ready** — Built for repeat production runs for brands, manufacturers and distributors.
- FAQs:
  - **Which board should I choose for my boxes?** — SBS gives a bright white, premium surface for cosmetics and luxury products. Duplex is an economical choice for FMCG and everyday goods. Mono cartons can be made on either, depending on your budget and finish. Tell us about your product and we'll recommend a board.
  - **Can you make boxes in a custom size?** — Yes. Every box is made to your dimensions. Share the length, width and height of your product (or the box) in your quote request.
  - **Do you help with the box design or dieline?** — Share your artwork or your product dimensions. Our team prepares the size layout and shares a proof for your approval before production.
  - **What information do you need for a quotation?** — Box dimensions, quantity, board preference (if any), printing colors, finishes and delivery city. Artwork helps us quote accurately.
- seo: see `SEO.md` §2.

### 5.2 Stickers — `/custom-stickers`

- name: **Stickers** · tagline ★: _Customized stickers for branding, packaging, product labeling and promotional applications._
- heading ★: **Custom Stickers for Branding & Product Packaging**
- intro:
  1. ★ _Create attractive product labels and branded stickers with customized printing options. Suitable for packaging, promotions, labeling and business branding._
  2. _Choose paper for everyday labels, vinyl for moisture resistance, or PVC for extra durability — supplied on sheets or rolls, and cut to any shape you need._
- highlights:
  - `Droplets` **Right material for the job** — Paper, vinyl and PVC options for indoor, wet and heavy-handling use.
  - `Scissors` **Any shape** — Die-cut to your logo or label outline, or standard rectangles, circles and ovals.
  - `Layers` **Sheets or rolls** — Sheets for hand application, rolls for faster labeling.
  - `Sparkles` **Finishes** — Gloss, matte, lamination and metallic options.
- FAQs:
  - **What's the difference between paper, vinyl and PVC stickers?** — Paper stickers are economical and ideal for dry, indoor use. Vinyl stickers are flexible and water-resistant, good for bottles and containers. PVC stickers are thicker and more durable, suited to appliances, chemicals and outdoor exposure.
  - **What does "gumming sticker" mean?** — A gumming sticker is a self-adhesive label: printed material with adhesive on the back and a release liner you peel off before applying.
  - **Can I get stickers on rolls for a labeling machine?** — Yes. Mention your roll requirements (core size and winding direction, if you know them) in your quote request.
  - **Can stickers be printed with variable data like batch numbers or MRP?** — Share the details in your quote request and our team will confirm what's possible for your order.

### 5.3 DTF Stickers — `/dtf-stickers`

- name: **DTF Stickers** · tagline ★: _Custom DTF transfer stickers for apparel decoration and fabric branding._
- heading ★: **Custom DTF Transfers for Apparel & Fabric Branding**
- intro:
  1. ★ _Bring your designs to life with custom DTF transfer stickers. Ideal for apparel decoration, customized clothing and fabric branding applications._
  2. _DTF (direct-to-film) transfers are printed in full color with a white underbase on PET film, then coated with adhesive powder. You press them onto fabric with a heat press — no screens, no minimums per color, and fine detail is preserved._
- highlights:
  - `Shirt` **Works on most fabrics** — Cotton, polyester, blends and more, on light or dark garments.
  - `Palette` **Full color, fine detail** — Gradients, small text and photographic artwork reproduce cleanly.
  - `LayoutGrid` **Gang sheets** — Combine multiple designs and sizes on one sheet to save cost.
  - `Flame` **Ready to press** — Delivered ready for application with a standard heat press.
- FAQs:
  - **What is DTF printing?** — DTF stands for direct-to-film. Your design is printed onto a special PET film with color and white inks, coated with hot-melt adhesive powder and cured. You then heat-press it onto the garment and peel the film away.
  - **Which fabrics can DTF transfers be applied to?** — Cotton, polyester, poly-cotton blends and many other fabrics. If you're unsure about a specific material, mention it in your quote request.
  - **Do I need special equipment to apply DTF transfers?** — A heat press is recommended for consistent results. We share the recommended temperature, time and pressure with your order.
  - **What's the difference between DTF and UV DTF?** — DTF is heat-applied to fabric. UV DTF is a peel-and-stick transfer for hard surfaces like glass, metal and plastic, and needs no heat.

### 5.4 UV DTF Stickers — `/uv-dtf-stickers`

- name: **UV DTF Stickers** · tagline ★: _Premium UV DTF transfer stickers for customized branding and decorative applications._
- heading ★: **Premium UV DTF Transfers for Custom Branding**
- intro:
  1. ★ _Enhance your products with customized UV DTF transfer stickers. Suitable for decorative branding and applications on compatible hard surfaces._
  2. _UV DTF stickers are printed with UV-cured inks and varnish, giving a raised, glossy finish. They apply without heat — peel, place, rub and lift the carrier film — making them ideal for bottles, tumblers, packaging and promotional items._
- highlights:
  - `GlassWater` **For hard surfaces** — Glass, metal, plastic, acrylic, ceramic, wood and more.
  - `Hand` **No heat needed** — Simple peel-and-press application, no equipment required.
  - `Sparkles` **Raised, glossy finish** — A tactile, premium look with vivid color.
  - `Scissors` **Custom shapes** — Logos, wraps and decals in the size and outline you need.
- FAQs:
  - **How do I apply a UV DTF sticker?** — Peel the backing, place the transfer on a clean, dry surface, rub firmly over the design, then slowly peel away the top film. The design stays on the surface.
  - **Which surfaces work best?** — Smooth, hard, non-porous surfaces such as glass, metal, hard plastics, acrylic and ceramic. Clean the surface first for best adhesion.
  - **Are UV DTF stickers suitable for fabric?** — No. For garments and fabric, choose DTF transfer stickers instead.
  - **Can I order UV DTF wraps for cups and bottles?** — Yes. Share the item and the wrap size you need in your quote request.

### 5.5 Tags — `/custom-tags`

- name: **Tags** · tagline ★: _Customized product tags to give your brand a professional identity._
- heading ★: **Customized Tags That Highlight Your Brand**
- intro:
  1. ★ _Give your products a professional finishing touch with custom hang tags, plastic tags and die-cut tags. Designed according to your brand identity and product requirements._
  2. _Choose premium card or kraft for a classic retail feel, or durable plastic for tags that need to survive water and handling — finished with foil, embossing, eyelets and strings._
- highlights:
  - `Tag` **Shapes and sizes** — Rectangle, rounded, circular or fully custom die-cut shapes.
  - `Sparkles` **Premium details** — Foil stamping, embossing, spot UV and textured stocks.
  - `Link` **Ready to attach** — Punched holes, metal eyelets, strings and loop pins on request.
  - `Droplets` **Durable options** — Plastic tags for wet, outdoor and heavy-use products.
- FAQs:
  - **What material are hang tags printed on?** — Usually premium art card or kraft card in a thickness that suits your product. Plastic (PVC/PP) is available for tags that must resist water and tearing.
  - **Can tags be printed on both sides?** — Yes. Many brands print the logo on the front and size, care or price details on the back.
  - **Do you supply strings or eyelets?** — Mention your attachment preference in your quote request — hole only, eyelet, string or loop pin — and we'll include it in the quotation.
  - **Can I get tags in a custom shape?** — Yes, tags can be die-cut to a custom outline. Share the shape in your artwork.

---

## 6. Product pages (13)

Each product maps 1:1 to `src/content/products/<slug>.ts`. Image files and prompts: `ASSET-PROMPTS.md` §4 (image _n_ below = `/images/products/<slug>/<n>.webp`). Spec values describe the **options available on request**; they are not guarantees for every order (see §9).

### 6.1 Mono Carton Boxes — `/mono-carton-boxes`

- **category:** packaging-boxes · **featured:** yes · **sortOrder:** 1
- **heading:** Mono Carton Boxes for Retail, Pharma & FMCG Brands
- **summary:** Custom printed mono carton boxes made from single-layer paperboard — lightweight, sharp to print and sized exactly to your product.
- **intro:**
  1. Mono cartons are folding boxes made from a single layer of paperboard. They're the most widely used retail packaging for cosmetics, medicines, food and personal care products because they print beautifully, fold flat for storage and protect the product without adding bulk.
  2. We make mono cartons to your exact dimensions on [SBS board](/sbs-boxes) or [duplex board](/duplex-boxes), printed in full color and finished with lamination, spot UV, foil stamping or embossing. Choose a box style that suits your packing line and shelf display.
- **features:**
  - `Ruler` **Exact-fit sizing** — Every carton is made to your product's dimensions for a clean, secure fit.
  - `Palette` **Sharp full-color print** — Offset printing in CMYK with Pantone spot colors for brand accuracy.
  - `Sparkles` **Premium finishing** — Matte, gloss or soft-touch lamination, spot UV, foil and embossing.
  - `Package` **Flat-packed delivery** — Supplied flat to save storage space; quick to erect on your packing line.
- **specs:**

| Label          | Value                                                                    |
| -------------- | ------------------------------------------------------------------------ |
| Board          | SBS or duplex board, approx. 250–400 GSM                                 |
| Printing       | Offset CMYK, Pantone spot colors, inside printing on request             |
| Coating        | Aqueous varnish, UV varnish                                              |
| Lamination     | Matte, gloss, soft-touch                                                 |
| Embellishments | Spot UV, hot foil stamping (gold, silver, colored), embossing, debossing |
| Box styles     | Reverse tuck end, straight tuck end, crash-lock bottom, sleeve, custom   |
| Add-ons        | Window patching, inserts, tamper-evident flaps                           |
| Supply         | Flat-packed, die-cut and glued                                           |

- **options:** materials: SBS board · Duplex board (grey back) · Duplex board (white back) — printing: CMYK offset · Pantone spot colors · Inside printing — finishes: Matte lamination · Gloss lamination · Soft-touch lamination · Spot UV · Hot foil stamping · Embossing · Debossing · Aqueous varnish · UV varnish — formats: Reverse tuck end · Straight tuck end · Crash-lock bottom · Sleeve · Custom style
- **applications:** Cosmetics & skincare · Pharmaceuticals & nutraceuticals · Food & confectionery · Personal care · Perfumes & fragrances · Electronics accessories · Toys & gifts · Ayurvedic & herbal products
- **FAQs:**
  - **What is a mono carton box?** — A mono carton is a folding box made from a single sheet of paperboard (not corrugated). It's light, prints very well and is the standard choice for retail product packaging.
  - **Which board is best for mono cartons?** — SBS gives a bright white, premium surface for cosmetics and luxury items. Duplex is more economical for FMCG and everyday products. We'll recommend a board and thickness based on your product's weight and positioning.
  - **Can you add a window to the carton?** — Yes, a die-cut window with a clear film (window patching) can be added so customers can see the product.
  - **What do I need to share for a quote?** — Box dimensions (L × W × H), quantity, board preference, number of print colors, finishes and delivery city. Artwork or a sample photo helps.
- **related:** sbs-boxes · duplex-boxes · paper-gumming-stickers · custom-hang-tags
- **quoteHints:** size _e.g. 120 × 80 × 40 mm (L × W × H)_ · quantity _e.g. 5,000 boxes_ · material _e.g. 350 GSM SBS_
- **image alts:** 1 _Matte-laminated mono carton boxes with gold foil detailing on a light grey background_ · 2 _Open reverse tuck end mono carton showing the inside print_ · 3 _Stack of flat-packed printed mono cartons_ · 4 _Close-up of spot UV and embossing on a mono carton_

### 6.2 SBS Boxes — `/sbs-boxes`

- **category:** packaging-boxes · **sortOrder:** 2
- **heading:** SBS Boxes — Premium Solid Bleached Sulphate Packaging
- **summary:** Premium boxes made from solid bleached sulphate board — bright white through and through, for crisp print and a luxury finish.
- **intro:**
  1. SBS (Solid Bleached Sulphate) is a premium paperboard made from bleached virgin pulp. It's white on both sides and through the core, with a smooth coated surface that reproduces fine detail, rich colors and metallic finishes beautifully.
  2. That makes SBS the board of choice for cosmetics, fragrances, premium food and gift packaging, where the box is part of the product experience. We print and finish SBS boxes to your size and style — pair it with foil, embossing or soft-touch lamination for a high-end feel. For everyday packaging, compare our [duplex boxes](/duplex-boxes).
- **features:**
  - `Sun` **Bright white surface** — Clean white inside and out, so colors look vivid and true.
  - `Gem` **Luxury presentation** — Ideal base for foil, embossing and soft-touch finishes.
  - `ShieldCheck` **Strong and rigid** — Holds shape well and protects lightweight premium products.
  - `UtensilsCrossed` **Food-grade options** — Food-safe board grades available on request for food packaging.
- **specs:**

| Label          | Value                                                                  |
| -------------- | ---------------------------------------------------------------------- |
| Board          | Solid bleached sulphate (SBS), approx. 250–450 GSM                     |
| Surface        | Coated, white on both sides                                            |
| Printing       | Offset CMYK, Pantone spot colors, metallic inks on request             |
| Lamination     | Matte, gloss, soft-touch                                               |
| Embellishments | Hot foil stamping, embossing, debossing, spot UV                       |
| Box styles     | Tuck end, crash-lock bottom, sleeve, lid-and-base (paperboard), custom |
| Add-ons        | Window patching, paperboard inserts                                    |
| Supply         | Flat-packed, die-cut and glued                                         |

- **options:** materials: SBS board · Food-grade SBS (on request) — printing: CMYK offset · Pantone spot colors · Metallic inks — finishes: Matte lamination · Gloss lamination · Soft-touch lamination · Spot UV · Hot foil stamping · Embossing · Debossing — formats: Tuck end · Crash-lock bottom · Sleeve · Lid-and-base · Custom style
- **applications:** Cosmetics & makeup · Perfumes & fragrances · Premium skincare · Chocolates & premium food · Jewellery & accessories · Gift boxes · Pharmaceuticals · Electronics
- **FAQs:**
  - **What does SBS stand for?** — Solid Bleached Sulphate — a paperboard made entirely from bleached chemical pulp, so it's white throughout.
  - **How is SBS different from duplex board?** — SBS is white through the core and has a smoother, brighter surface, giving a more premium look. Duplex usually has a grey or white back and is more economical.
  - **Is SBS suitable for food packaging?** — Food-grade SBS grades are available. Mention that your product is food so we can quote the right board.
  - **Can SBS boxes have foil and embossing together?** — Yes. SBS is an excellent base for combining foil stamping, embossing and spot UV.
- **related:** mono-carton-boxes · duplex-boxes · custom-hang-tags · die-cut-stickers
- **quoteHints:** size _e.g. 60 × 60 × 150 mm (L × W × H)_ · quantity _e.g. 3,000 boxes_ · material _e.g. 400 GSM SBS_
- **image alts:** 1 _Bright white SBS box with soft-touch finish and silver foil on a light grey background_ · 2 _Premium SBS perfume box beside its open lid_ · 3 _Edge detail of SBS board showing white core_ · 4 _Embossed logo on a white SBS carton_

### 6.3 Duplex Boxes — `/duplex-boxes`

- **category:** packaging-boxes · **sortOrder:** 3
- **heading:** Duplex Boxes — Economical Printed Cartons for Everyday Products
- **summary:** Printed duplex board boxes that balance cost and quality — the dependable choice for FMCG, hardware and high-volume products.
- **intro:**
  1. Duplex board is a multi-layer paperboard with a coated white printing surface and a grey or white back. It's sturdy, prints well and costs less than SBS, which is why it's used for a huge range of everyday consumer goods.
  2. We produce duplex boxes in custom sizes and styles with full-color printing and protective coatings. They're a smart choice when you need large quantities of attractive, reliable packaging on a budget. For a more premium look, see [SBS boxes](/sbs-boxes).
- **features:**
  - `IndianRupee` **Cost-effective** — Lower board cost than SBS, ideal for high-volume products.
  - `Palette` **Good print quality** — Coated white top surface for clear, colorful graphics.
  - `ShieldCheck` **Sturdy** — Multi-layer board holds its shape and protects contents.
  - `Ruler` **Custom sizes and styles** — Made to fit your product and packing process.
- **specs:**

| Label          | Value                                                                  |
| -------------- | ---------------------------------------------------------------------- |
| Board          | Coated duplex board — grey back or white back, approx. 230–450 GSM     |
| Printing       | Offset CMYK, Pantone spot colors                                       |
| Coating        | Aqueous varnish, UV varnish                                            |
| Lamination     | Matte, gloss                                                           |
| Embellishments | Spot UV, foil stamping                                                 |
| Box styles     | Reverse tuck end, straight tuck end, crash-lock bottom, sleeve, custom |
| Add-ons        | Window patching, hang-tab (euro slot)                                  |
| Supply         | Flat-packed, die-cut and glued                                         |

- **options:** materials: Duplex board (grey back) · Duplex board (white back) — printing: CMYK offset · Pantone spot colors — finishes: Matte lamination · Gloss lamination · Aqueous varnish · UV varnish · Spot UV · Foil stamping — formats: Reverse tuck end · Straight tuck end · Crash-lock bottom · Sleeve · Hang-tab box · Custom style
- **applications:** FMCG & household products · Toys & games · Hardware & tools · Electrical accessories · Stationery · Snacks & dry food (secondary packaging) · Agarbatti & pooja products · Mobile accessories
- **FAQs:**
  - **What is duplex board?** — A multi-layer paperboard with a coated white top layer for printing and a grey or white back. It's strong, economical and widely used for consumer packaging.
  - **Grey back or white back — which should I choose?** — Grey back is the most economical. White back looks cleaner when the inside of the box is visible. We can quote both.
  - **Can duplex boxes have a hanging tab for retail pegs?** — Yes, a euro-slot hang tab can be built into the box design.
  - **Are duplex boxes good for heavy products?** — For heavier items we'll recommend a thicker board or an alternative structure. Share your product weight in the quote request.
- **related:** mono-carton-boxes · sbs-boxes · paper-gumming-stickers · pvc-gumming-stickers
- **quoteHints:** size _e.g. 150 × 100 × 50 mm (L × W × H)_ · quantity _e.g. 10,000 boxes_ · material _e.g. 300 GSM grey-back duplex_
- **image alts:** 1 _Colorful printed duplex boxes in different sizes on a light grey background_ · 2 _Duplex carton showing grey inner back_ · 3 _Duplex box with euro-slot hang tab_ · 4 _Flat-packed duplex cartons in a neat stack_

### 6.4 Paper Gumming Stickers — `/paper-gumming-stickers`

- **category:** custom-stickers · **featured:** yes · **sortOrder:** 1
- **heading:** Paper Gumming Stickers — Custom Printed Paper Labels
- **summary:** Self-adhesive paper stickers for product labels, MRP, packaging seals and branding — economical, crisp and supplied on sheets or rolls.
- **intro:**
  1. Paper gumming stickers are self-adhesive labels printed on paper with a peel-off backing. They're the most economical way to label products, seal packaging and add branding, and they print sharp text and vibrant color.
  2. We print paper stickers in any size or shape — rectangles, circles, ovals or [die-cut outlines](/die-cut-stickers) — with gloss, matte or laminated finishes. For labels that will face moisture, choose [vinyl](/vinyl-gumming-stickers) or [PVC](/pvc-gumming-stickers) instead.
- **features:**
  - `IndianRupee` **Economical** — The lowest cost per label for dry, indoor applications.
  - `Type` **Crisp print** — Ideal for logos, ingredient lists, barcodes and small text.
  - `Layers` **Sheets or rolls** — Sheets for hand labeling, rolls for faster application.
  - `Scissors` **Any shape** — Standard shapes or custom die-cut outlines.
- **specs:**

| Label         | Value                                                            |
| ------------- | ---------------------------------------------------------------- |
| Face material | Chromo (gloss) paper, mirrorcoat paper, matte paper, kraft paper |
| Adhesive      | Permanent (standard), removable on request                       |
| Printing      | CMYK, Pantone spot colors                                        |
| Finish        | Gloss, matte, gloss or matte lamination, varnish                 |
| Shapes        | Rectangle, square, circle, oval, custom die-cut                  |
| Supply        | Sheets or rolls (core size on request)                           |

- **options:** materials: Chromo paper · Mirrorcoat paper · Matte paper · Kraft paper — printing: CMYK · Pantone spot colors — finishes: Gloss · Matte · Gloss lamination · Matte lamination · Varnish — formats: Sheets · Rolls · Kiss-cut · Die-cut
- **applications:** Product labels · MRP & batch labels · Packaging seals · Jar and box labels · Address & shipping labels · Promotional stickers · Food packaging labels · Event and gifting stickers
- **FAQs:**
  - **Are paper stickers waterproof?** — Standard paper stickers are not waterproof. Lamination adds some moisture and scuff resistance; for wet conditions choose vinyl or PVC stickers.
  - **Can I get paper labels on rolls?** — Yes. Share the label size, quantity per roll and core size (if you use a labeling machine) in your quote request.
  - **What's the difference between chromo and mirrorcoat paper?** — Both are glossy label papers. Mirrorcoat has a higher-gloss, cast-coated surface for a more premium shine.
  - **Can I print different designs in one order?** — Often yes. Mention the number of designs and quantity of each in your quote request.
- **related:** vinyl-gumming-stickers · pvc-gumming-stickers · die-cut-stickers · mono-carton-boxes
- **quoteHints:** size _e.g. 50 × 50 mm or 3 × 2 in_ · quantity _e.g. 10,000 labels_ · material _e.g. Chromo paper, gloss_
- **image alts:** 1 _Roll of printed paper gumming stickers beside labeled jars on a light grey background_ · 2 _Sheet of round paper stickers with one peeled_ · 3 _Kraft paper labels on gift boxes_ · 4 _Close-up of a glossy chromo paper product label_

### 6.5 Vinyl Gumming Stickers — `/vinyl-gumming-stickers`

- **category:** custom-stickers · **sortOrder:** 2
- **heading:** Vinyl Gumming Stickers — Waterproof, Flexible Labels
- **summary:** Flexible, water-resistant vinyl stickers for bottles, containers and products that get handled, chilled or washed.
- **intro:**
  1. Vinyl gumming stickers are printed on flexible vinyl film with a strong self-adhesive backing. Vinyl resists water, oil and scuffing far better than paper, and it conforms to curved surfaces like bottles and tubs.
  2. Choose white vinyl for bold, opaque color or transparent vinyl for a "no-label" look on glass and clear plastic. We print vinyl stickers on sheets or rolls and can cut them to any shape. For even more rigidity and durability, see [PVC gumming stickers](/pvc-gumming-stickers).
- **features:**
  - `Droplets` **Water-resistant** — Holds up to moisture, refrigeration and handling.
  - `Waves` **Flexible** — Wraps smoothly around bottles, jars and curved containers.
  - `Eye` **Transparent option** — Clear vinyl for a premium, label-less look.
  - `Scissors` **Custom shapes** — Die-cut to any outline, on sheets or rolls.
- **specs:**

| Label         | Value                                                            |
| ------------- | ---------------------------------------------------------------- |
| Face material | White vinyl, transparent vinyl                                   |
| Adhesive      | Permanent (standard)                                             |
| Printing      | CMYK, Pantone spot colors, white ink on transparent (on request) |
| Finish        | Gloss, matte, lamination                                         |
| Shapes        | Rectangle, circle, oval, custom die-cut                          |
| Supply        | Sheets or rolls                                                  |

- **options:** materials: White vinyl · Transparent vinyl — printing: CMYK · Pantone spot colors · White underprint on clear — finishes: Gloss · Matte · Gloss lamination · Matte lamination — formats: Sheets · Rolls · Die-cut
- **applications:** Beverage & water bottles · Cosmetics & shampoo bottles · Sauces & pickles jars · Cleaning products · Refrigerated food containers · Laptop & promotional stickers · Outdoor product labels · Candle jars
- **FAQs:**
  - **Are vinyl stickers waterproof?** — Vinyl is water-resistant and handles moisture, condensation and washing much better than paper. Lamination improves scratch resistance further.
  - **What's the difference between vinyl and PVC stickers?** — Vinyl is thinner and more flexible, ideal for curved surfaces. PVC stickers are thicker and more rigid, suited to flat surfaces that need extra durability.
  - **Can transparent vinyl stickers have white print?** — On request we can print a white layer behind the colors so your design stays vivid on clear surfaces. Mention it in your quote.
  - **Will vinyl stickers work in the fridge?** — Yes, vinyl stickers are commonly used on refrigerated containers. Apply them to a clean, dry surface before chilling.
- **related:** paper-gumming-stickers · pvc-gumming-stickers · die-cut-stickers · uv-dtf-sticker-printing
- **quoteHints:** size _e.g. 80 × 120 mm_ · quantity _e.g. 5,000 labels_ · material _e.g. Transparent vinyl, gloss_
- **image alts:** 1 _Glossy white vinyl labels on cosmetic bottles on a light grey background_ · 2 _Transparent vinyl sticker on a glass bottle_ · 3 _Roll of vinyl labels_ · 4 _Water droplets on a vinyl label showing water resistance_

### 6.6 PVC Gumming Stickers — `/pvc-gumming-stickers`

- **category:** custom-stickers · **sortOrder:** 3
- **heading:** PVC Gumming Stickers — Durable Labels for Tough Conditions
- **summary:** Thick, tear-resistant PVC stickers that stand up to water, oil, heat and handling — in white, transparent and metallic finishes.
- **intro:**
  1. PVC gumming stickers are printed on a thicker plastic film than vinyl, giving them extra rigidity and resistance to tearing, oil and chemicals. They're the go-to label for appliances, electrical products, industrial containers and anything that needs to last.
  2. Choose white, transparent or metallic silver and gold PVC for a premium, durable label. We supply PVC stickers on sheets or rolls and can die-cut them to any shape.
- **features:**
  - `ShieldCheck` **Highly durable** — Resists tearing, water, oil and everyday wear.
  - `Sparkles` **Metallic options** — Silver and gold PVC for premium product branding.
  - `Thermometer` **Built for tough use** — Suited to appliances, electricals and industrial products.
  - `Scissors` **Custom shapes** — Die-cut outlines on sheets or rolls.
- **specs:**

| Label         | Value                                                              |
| ------------- | ------------------------------------------------------------------ |
| Face material | White PVC, transparent PVC, metallic silver PVC, metallic gold PVC |
| Adhesive      | Permanent, high-tack on request                                    |
| Printing      | CMYK, Pantone spot colors                                          |
| Finish        | Gloss, matte, lamination                                           |
| Shapes        | Rectangle, circle, oval, custom die-cut                            |
| Supply        | Sheets or rolls                                                    |

- **options:** materials: White PVC · Transparent PVC · Metallic silver PVC · Metallic gold PVC — printing: CMYK · Pantone spot colors — finishes: Gloss · Matte · Gloss lamination · Matte lamination — formats: Sheets · Rolls · Die-cut
- **applications:** Home appliances · Electrical & electronic products · Rating & specification plates · Lubricant & chemical containers · Automotive accessories · Industrial equipment · Paint containers · Premium product branding
- **FAQs:**
  - **When should I choose PVC over paper or vinyl?** — Choose PVC when your label must survive oil, chemicals, heat, frequent handling or outdoor exposure, or when you want a thicker, more rigid label.
  - **Can PVC stickers be used as rating or spec labels on appliances?** — Yes, PVC is commonly used for appliance and equipment labels. Share the surface type and conditions in your quote request.
  - **Do you offer metallic PVC stickers?** — Yes, silver and gold metallic PVC are available for a premium look.
  - **Are PVC stickers removable?** — Standard PVC stickers use a permanent adhesive. Let us know if you need a different adhesive.
- **related:** vinyl-gumming-stickers · paper-gumming-stickers · die-cut-stickers · plastic-tags
- **quoteHints:** size _e.g. 100 × 60 mm_ · quantity _e.g. 2,000 labels_ · material _e.g. Silver metallic PVC_
- **image alts:** 1 _Silver metallic PVC label on a home appliance panel_ · 2 _Transparent PVC sticker on a plastic container_ · 3 _Sheet of white PVC labels with die-cut corners_ · 4 _Gold PVC logo sticker close-up_

### 6.7 Die-Cut Stickers — `/die-cut-stickers`

- **category:** custom-stickers · **sortOrder:** 4
- **heading:** Die-Cut Stickers — Cut to the Exact Shape of Your Design
- **summary:** Custom die-cut stickers cut precisely around your logo or artwork, on paper, vinyl or PVC — for branding that stands out.
- **intro:**
  1. Die-cut stickers are cut to the exact outline of your design instead of a standard rectangle or circle. The result is a clean, professional sticker that looks like your logo — perfect for packaging, promotions, merchandise and product branding.
  2. We die-cut stickers on [paper](/paper-gumming-stickers), [vinyl](/vinyl-gumming-stickers) or [PVC](/pvc-gumming-stickers), as individual stickers or kiss-cut on sheets and rolls, with gloss, matte or laminated finishes.
- **features:**
  - `Scissors` **Precise outlines** — Cut around your logo, mascot or illustration.
  - `Layers` **Any material** — Paper, vinyl or PVC to match how the sticker will be used.
  - `LayoutGrid` **Individual or kiss-cut** — Single stickers, sheets with multiple designs, or rolls.
  - `Sparkles` **Eye-catching finishes** — Gloss, matte, lamination and metallic materials.
- **specs:**

| Label     | Value                                                                             |
| --------- | --------------------------------------------------------------------------------- |
| Materials | Paper, white vinyl, transparent vinyl, PVC, metallic PVC                          |
| Cut type  | Die-cut (through-cut), kiss-cut                                                   |
| Printing  | CMYK, Pantone spot colors                                                         |
| Finish    | Gloss, matte, lamination                                                          |
| Supply    | Individual stickers, sheets, rolls                                                |
| Artwork   | Vector cut line (AI, EPS, PDF, CDR) preferred; we can create one from your design |

- **options:** materials: Paper · White vinyl · Transparent vinyl · PVC · Metallic PVC — printing: CMYK · Pantone spot colors — finishes: Gloss · Matte · Gloss lamination · Matte lamination — formats: Individual die-cut · Kiss-cut sheets · Rolls
- **applications:** Logo stickers · Packaging & box seals · Product branding · Promotional giveaways · Laptop & bottle stickers · Event merchandise · Retail bags · Brand starter kits
- **FAQs:**
  - **What's the difference between die-cut and kiss-cut?** — Die-cut stickers are cut through the backing, so each sticker is separate. Kiss-cut stickers are cut through the sticker only, leaving them on a shared sheet or roll for easier handling.
  - **Do I need to supply a cut line?** — A vector cut line helps, but it isn't required. Share your artwork and we'll prepare the cut outline for your approval.
  - **Can very small or detailed shapes be die-cut?** — Very thin parts can be fragile. We'll review your artwork and suggest a slight outline (border) if needed.
  - **Which material should I choose?** — Paper for dry indoor use, vinyl for flexibility and moisture resistance, PVC for maximum durability.
- **related:** paper-gumming-stickers · vinyl-gumming-stickers · pvc-gumming-stickers · custom-uv-transfer-stickers
- **quoteHints:** size _e.g. 75 mm across_ · quantity _e.g. 1,000 stickers_ · material _e.g. White vinyl, matte_
- **image alts:** 1 _Assorted custom die-cut logo stickers on a light grey background_ · 2 _Kiss-cut sticker sheet with several shapes_ · 3 _Hand peeling a die-cut vinyl sticker_ · 4 _Die-cut stickers applied to packaging_

### 6.8 DTF Transfer Stickers — `/dtf-transfer-stickers`

- **category:** dtf-stickers · **featured:** yes · **sortOrder:** 1
- **heading:** DTF Transfer Stickers — Full-Color Prints for Any Garment
- **summary:** Custom DTF transfers and gang sheets printed in full color with a white underbase — ready to heat-press onto cotton, polyester and blends.
- **intro:**
  1. DTF (direct-to-film) transfer stickers let you put full-color, detailed designs on almost any fabric. Your artwork is printed onto PET film with color and white inks, coated with adhesive powder and cured — then you press it onto the garment and peel the film away.
  2. Order individual designs or combine many logos and sizes on a single gang sheet to make the most of every print. DTF works on light and dark fabrics, and there are no extra costs for more colors. For pre-cut logos and labels, see [DTF heat transfer stickers](/dtf-heat-transfer-stickers).
- **features:**
  - `Palette` **Unlimited colors** — Gradients, photos and fine details at no extra cost per color.
  - `Shirt` **Works on most fabrics** — Cotton, polyester, blends, fleece and more, light or dark.
  - `LayoutGrid` **Gang sheets** — Combine multiple designs on one sheet to reduce cost.
  - `Flame` **Ready to press** — Supplied ready for application with a heat press.
- **specs:**

| Label          | Value                                                                          |
| -------------- | ------------------------------------------------------------------------------ |
| Print process  | Direct-to-film: CMYK + white ink on PET film, hot-melt adhesive powder         |
| Formats        | Single designs, gang sheets, rolls                                             |
| Fabrics        | Cotton, polyester, poly-cotton blends, fleece, denim, canvas and more          |
| Garment colors | Light and dark                                                                 |
| Application    | Heat press — recommended temperature, time and pressure shared with your order |
| Peel           | Hot or cold peel (as specified for your film)                                  |
| Artwork        | PNG with transparent background (300 DPI at print size), PDF, AI, EPS, CDR     |

- **options:** materials: DTF PET film — printing: CMYK + white — finishes: Matte finish · Glossy finish (on request) — formats: Single designs · Gang sheets · Rolls
- **applications:** T-shirts & hoodies · Corporate uniforms · Sportswear & jerseys · Event & team merchandise · Tote bags · Caps (flat panels) · Kids' wear · Print-on-demand brands
- **FAQs:**
  - **What is a DTF gang sheet?** — A gang sheet is one large transfer sheet with many designs arranged on it. You cut the designs apart and press them individually — an efficient way to order multiple logos or sizes.
  - **What artwork format works best?** — A high-resolution PNG with a transparent background at 300 DPI at the final print size, or a vector file (PDF, AI, EPS, CDR).
  - **How do I apply DTF transfers?** — Use a heat press at the recommended temperature, time and pressure, then peel the film as specified. We share application instructions with every order.
  - **Will DTF prints crack or fade after washing?** — Applied correctly and washed inside-out as per care instructions, DTF prints are designed to stay flexible and vibrant through repeated washing.
- **related:** dtf-heat-transfer-stickers · uv-dtf-sticker-printing · custom-hang-tags · plastic-tags
- **quoteHints:** size _e.g. 22 × 39 in gang sheet, or 10 × 10 in per design_ · quantity _e.g. 20 sheets or 500 prints_ · material _e.g. Matte finish_
- **image alts:** 1 _Full-color DTF transfer gang sheet on a light grey background_ · 2 _DTF transfer being peeled from a black T-shirt after pressing_ · 3 _Heat press applying a DTF transfer to a T-shirt_ · 4 _Close-up of DTF print detail on fabric_

### 6.9 DTF Heat Transfer Stickers — `/dtf-heat-transfer-stickers`

- **category:** dtf-stickers · **sortOrder:** 2
- **heading:** DTF Heat Transfer Stickers — Ready-to-Press Logos & Labels
- **summary:** Pre-cut DTF heat transfer stickers for logos, neck labels and garment branding — consistent, full color and quick to apply in bulk.
- **intro:**
  1. DTF heat transfer stickers are individual, pre-cut transfers made for repeat garment branding — chest logos, sleeve prints, neck labels and care labels. Each piece is printed in full color with a white base and ready to press.
  2. They're ideal for apparel brands and uniform suppliers who press the same design on hundreds of garments. Order them by quantity in your sizes; for many different designs on one sheet, choose [DTF transfer gang sheets](/dtf-transfer-stickers).
- **features:**
  - `Scissors` **Pre-cut pieces** — Individual transfers, trimmed and ready to press.
  - `Copy` **Consistent repeats** — The same logo, size and color across every garment.
  - `Tag` **Tagless neck labels** — Replace sewn labels with soft printed labels.
  - `Timer` **Fast application** — Quick pressing for bulk production runs.
- **specs:**

| Label         | Value                                                                 |
| ------------- | --------------------------------------------------------------------- |
| Print process | Direct-to-film: CMYK + white ink, hot-melt adhesive                   |
| Format        | Individual pre-cut transfers                                          |
| Typical uses  | Chest and sleeve logos, neck labels, care labels, small graphics      |
| Fabrics       | Cotton, polyester, blends, nylon (test first), fleece                 |
| Application   | Heat press — settings shared with your order                          |
| Artwork       | Vector (PDF, AI, EPS, CDR) or 300 DPI PNG with transparent background |

- **options:** materials: DTF PET film — printing: CMYK + white — finishes: Matte · Glossy (on request) — formats: Pre-cut individual transfers · Neck labels · Logo packs
- **applications:** Brand logos on apparel · Tagless neck labels · Corporate uniforms · School & sports uniforms · Bags & accessories · Merchandise for events · Workwear · Private-label clothing
- **FAQs:**
  - **How is this different from a DTF gang sheet?** — Heat transfer stickers are supplied as individual pre-cut pieces of the same design, ready to press. Gang sheets combine many designs on one sheet for you to cut.
  - **Can DTF be used for neck labels?** — Yes. Printed neck labels are soft, comfortable and an alternative to sewn-in tags.
  - **What is the smallest size you can print?** — Small logos and text are possible, but very fine lines may not hold. Share your artwork and we'll advise.
  - **Can I reorder the same design later?** — Yes. Share your previous order reference when you request a repeat quote.
- **related:** dtf-transfer-stickers · custom-hang-tags · plastic-tags · uv-dtf-sticker-printing
- **quoteHints:** size _e.g. 3 × 3 in logo_ · quantity _e.g. 1,000 pieces_ · material _e.g. Matte finish_
- **image alts:** 1 _Pre-cut DTF heat transfer logos stacked on a light grey background_ · 2 _DTF printed neck label inside a T-shirt collar_ · 3 _Chest logo applied with DTF on a polo shirt_ · 4 _Sheet of identical pre-cut DTF logo transfers_

### 6.10 UV DTF Stickers — `/uv-dtf-sticker-printing`

- **category:** uv-dtf-stickers · **sortOrder:** 1
- **heading:** UV DTF Stickers — Raised, Glossy Decals for Hard Surfaces
- **summary:** Custom UV DTF stickers that apply without heat to glass, metal, plastic and more — with a vivid, raised, glossy finish.
- **intro:**
  1. UV DTF stickers are printed with UV-cured inks, white and clear varnish on a transfer film, then laminated with a carrier film. To apply, you peel the backing, press the design onto the surface and lift the carrier — leaving only the design behind, with no background or edges.
  2. They bond to smooth, hard surfaces like glass, metal, hard plastics, acrylic, ceramic and wood, and the varnish layer gives a raised, premium texture. Use them for product branding, packaging, promotional items and decorative pieces. For fabric, choose [DTF transfer stickers](/dtf-transfer-stickers).
- **features:**
  - `Hand` **No heat, no tools** — Peel, press and lift — anyone can apply them.
  - `Sparkles` **Raised glossy texture** — A tactile, premium look and feel.
  - `GlassWater` **Hard-surface adhesion** — Glass, metal, plastic, acrylic, ceramic and wood.
  - `Eraser` **No background** — Only your design transfers — no visible sticker edge.
- **specs:**

| Label         | Value                                                                     |
| ------------- | ------------------------------------------------------------------------- |
| Print process | UV-cured CMYK + white + clear varnish on A-film, laminated with B-film    |
| Finish        | Glossy raised varnish (standard); matte on request                        |
| Surfaces      | Glass, metal, hard plastics, acrylic, ceramic, wood, leather (test first) |
| Application   | Cold application — peel, press, rub, lift carrier film                    |
| Formats       | Individual decals, sheets with multiple designs                           |
| Artwork       | Vector (PDF, AI, EPS, CDR) or 300 DPI PNG with transparent background     |

- **options:** materials: UV DTF film — printing: CMYK + white + varnish — finishes: Glossy raised · Matte (on request) — formats: Individual decals · Multi-design sheets
- **applications:** Glass bottles & jars · Tumblers & mugs · Phone & laptop cases · Helmets & sports gear · Corporate gifts · Signage & acrylic displays · Cosmetic packaging · Wooden & metal products
- **FAQs:**
  - **Do UV DTF stickers need heat to apply?** — No. They are applied by pressure: peel, place, rub firmly and lift the carrier film.
  - **Are UV DTF stickers waterproof?** — UV-cured inks and varnish make them water-resistant once applied to a clean, suitable surface. For items that will be washed often, mention it in your quote request so we can advise.
  - **Can I use them on fabric or T-shirts?** — No. UV DTF is for hard surfaces. For fabric, use DTF transfer stickers.
  - **How should I prepare the surface?** — Clean it with isopropyl alcohol, let it dry fully, then apply. Avoid textured, oily or very flexible surfaces.
- **related:** custom-uv-transfer-stickers · dtf-transfer-stickers · vinyl-gumming-stickers · die-cut-stickers
- **quoteHints:** size _e.g. 2 × 2 in per decal_ · quantity _e.g. 500 decals_ · material _e.g. Glossy raised finish_
- **image alts:** 1 _Colorful UV DTF decal on a glass jar on a light grey background_ · 2 _UV DTF sticker being applied to a metal tumbler_ · 3 _Close-up of the raised glossy texture of a UV DTF print_ · 4 _Sheet of UV DTF decals with carrier film_

### 6.11 Custom UV Transfer Stickers — `/custom-uv-transfer-stickers`

- **category:** uv-dtf-stickers · **sortOrder:** 2
- **heading:** Custom UV Transfer Stickers — Logos, Wraps & Branding
- **summary:** Custom UV transfer stickers made to your logo, size and shape — including cup and bottle wraps — for premium branding on hard surfaces.
- **intro:**
  1. Custom UV transfer stickers take the UV DTF process and make it yours — your logo, your colors, your exact dimensions. They're ideal when you want a branded, premium finish on products, packaging or merchandise without screen printing or engraving.
  2. Order logo decals for corporate gifts, full wraps for cups and tumblers, or branded labels for cosmetic and beverage packaging. Every order is printed from your artwork after you approve a proof. See [UV DTF stickers](/uv-dtf-sticker-printing) for how the process works.
- **features:**
  - `PenTool` **Made from your artwork** — Logos and designs printed exactly to your size.
  - `CupSoda` **Wraps for drinkware** — Full wraps for cups, tumblers and bottles.
  - `Gift` **Premium gifting** — Branded finish on corporate gifts and merchandise.
  - `Hand` **Easy application** — No heat or equipment needed.
- **specs:**

| Label         | Value                                                                    |
| ------------- | ------------------------------------------------------------------------ |
| Print process | UV-cured CMYK + white + varnish, transfer film                           |
| Formats       | Logo decals, cup/tumbler wraps, bottle wraps, multi-design sheets        |
| Finish        | Glossy raised (standard), matte on request                               |
| Surfaces      | Glass, stainless steel, aluminium, hard plastics, acrylic, ceramic, wood |
| Sizing        | Made to your dimensions; wraps sized to your item                        |
| Artwork       | Vector preferred; proof shared before printing                           |

- **options:** materials: UV DTF film — printing: CMYK + white + varnish — finishes: Glossy raised · Matte (on request) — formats: Logo decals · Cup wraps · Tumbler wraps · Bottle wraps · Multi-design sheets
- **applications:** Corporate gifting · Drinkware branding · Cosmetic & perfume bottles · Beverage packaging · Electronics & gadgets · Promotional merchandise · Trophies & awards · Retail displays
- **FAQs:**
  - **Can you make wraps for a specific cup or bottle?** — Yes. Share the item name or its dimensions (height and circumference) and we'll size the wrap.
  - **Can the stickers be metallic?** — Ask about metallic-look effects in your quote request; we'll confirm what's possible for your design.
  - **Is there a minimum order quantity?** — Quantities depend on size and design. Share your requirement and we'll quote accordingly.
  - **Will I see a proof before printing?** — Yes. We share a proof for your approval before production begins.
- **related:** uv-dtf-sticker-printing · die-cut-stickers · pvc-gumming-stickers · dtf-heat-transfer-stickers
- **quoteHints:** size _e.g. 9 × 4 in tumbler wrap_ · quantity _e.g. 200 wraps_ · material _e.g. Glossy raised_
- **image alts:** 1 _Custom UV transfer wrap on a frosted glass cup on a light grey background_ · 2 _Branded logo decal on a stainless steel tumbler_ · 3 _UV transfer label on a perfume bottle_ · 4 _Set of corporate gift items with UV transfer logos_

### 6.12 Custom Hang Tags — `/custom-hang-tags`

- **category:** custom-tags · **featured:** yes · **sortOrder:** 1
- **heading:** Custom Hang Tags — Printed Tags That Finish Your Product
- **summary:** Custom printed hang tags for apparel and products — on premium art card or kraft, with foil, embossing, eyelets and strings.
- **intro:**
  1. A hang tag is often the first thing a customer touches. Custom hang tags carry your brand, price, size and care information while making your product look finished and retail-ready.
  2. We print hang tags on premium art card or kraft card, single or double-sided, in standard or custom die-cut shapes. Add foil stamping, embossing or spot UV, and choose how they attach — punched hole, metal eyelet, cotton string or loop pins. For water-resistant tags, see [plastic tags](/plastic-tags).
- **features:**
  - `Gem` **Premium stocks** — Art card, kraft and textured card in sturdy thicknesses.
  - `Sparkles` **Luxury finishes** — Foil stamping, embossing, debossing and spot UV.
  - `Shapes` **Any shape** — Rectangle, rounded corners, circle or custom die-cut.
  - `Link` **Ready to attach** — Holes, eyelets, strings and loop pins on request.
- **specs:**

| Label       | Value                                                                                     |
| ----------- | ----------------------------------------------------------------------------------------- |
| Stock       | Art card, kraft card, textured card — approx. 300–600 GSM (or pasted for extra thickness) |
| Printing    | CMYK, Pantone spot colors, single or double-sided                                         |
| Finishes    | Matte or gloss lamination, soft-touch, spot UV, hot foil, embossing, debossing            |
| Shapes      | Rectangle, rounded corners, circle, custom die-cut                                        |
| Attachments | Punched hole, metal eyelet, cotton/satin string, loop pins                                |
| Extras      | Numbering, barcode or price area on request                                               |

- **options:** materials: Art card · Kraft card · Textured card · Pasted board — printing: CMYK · Pantone spot colors · Double-sided — finishes: Matte lamination · Gloss lamination · Soft-touch · Spot UV · Hot foil stamping · Embossing · Debossing — formats: Rectangle · Rounded corners · Circle · Custom die-cut · With eyelet · With string
- **applications:** Garments & fashion · Ethnic wear & sarees · Footwear · Bags & accessories · Jewellery · Gifts & hampers · Handicrafts · Home textiles
- **FAQs:**
  - **What thickness should my hang tags be?** — Most apparel tags use a sturdy card that doesn't bend easily. Pasted (double-layer) card gives a thicker, more premium tag. We'll recommend a thickness based on your product.
  - **Can you add strings to the tags?** — Yes. Choose cotton, jute or satin strings, or loop pins, and mention the color in your quote request.
  - **Can tags be printed on both sides?** — Yes, double-sided printing is available — often logo on the front and details on the back.
  - **Can I get kraft tags with foil?** — Yes. Foil stamping on kraft card gives a natural yet premium look.
- **related:** plastic-tags · mono-carton-boxes · dtf-heat-transfer-stickers · die-cut-stickers
- **quoteHints:** size _e.g. 2 × 3.5 in_ · quantity _e.g. 5,000 tags_ · material _e.g. 400 GSM kraft card with gold foil_
- **image alts:** 1 _Premium hang tags with gold foil and cotton strings on a light grey background_ · 2 _Kraft hang tag on a folded shirt_ · 3 _Die-cut hang tags with metal eyelets_ · 4 _Embossed logo detail on a black hang tag_

### 6.13 Plastic Tags — `/plastic-tags`

- **category:** custom-tags · **sortOrder:** 2
- **heading:** Plastic Tags — Waterproof, Tear-Resistant Product Tags
- **summary:** Durable PVC and PP plastic tags printed to your design — for products, garments and plants that face water, handling and the outdoors.
- **intro:**
  1. Plastic tags don't tear, curl or soak through. Printed on PVC or PP sheet, they keep your brand and product information intact through moisture, washing, handling and outdoor exposure.
  2. Choose white, frosted or transparent plastic, in standard or custom die-cut shapes, with holes, eyelets or pre-punched slots for ties. For a classic printed-card look, see [custom hang tags](/custom-hang-tags).
- **features:**
  - `Droplets` **Waterproof** — Unaffected by water, humidity and washing.
  - `ShieldCheck` **Tear-resistant** — Survives rough handling and repeated use.
  - `Eye` **Frosted & clear options** — Modern, premium translucent looks.
  - `Shapes` **Custom shapes** — Die-cut to any outline with holes or slots.
- **specs:**

| Label       | Value                                             |
| ----------- | ------------------------------------------------- |
| Material    | PVC or PP sheet — white, frosted, transparent     |
| Printing    | CMYK, Pantone spot colors, single or double-sided |
| Finish      | Gloss, matte, frosted                             |
| Shapes      | Rectangle, rounded corners, custom die-cut        |
| Attachments | Punched hole, eyelet, slot for cable ties, string |
| Extras      | Numbering or barcode area on request              |

- **options:** materials: White PVC · Frosted PVC · Transparent PVC · PP sheet — printing: CMYK · Pantone spot colors · Double-sided — finishes: Gloss · Matte · Frosted — formats: Rectangle · Rounded corners · Custom die-cut · With hole · With eyelet · With slot
- **applications:** Swimwear & sportswear · Outdoor & garden products · Plant & nursery tags · Luggage & bags · Industrial & equipment tags · Premium apparel · Kids' products · Promotional tags
- **FAQs:**
  - **What is the difference between PVC and PP tags?** — Both are durable plastics. PVC is rigid with a smooth print surface; PP is lighter and slightly more flexible. We'll suggest one based on your use.
  - **Are plastic tags suitable for outdoor use?** — Yes, they resist water and handling far better than card. Mention outdoor or sunlight exposure so we can recommend the right material and print.
  - **Can I get transparent tags with white print?** — Share your design and we'll confirm the best way to keep it visible on a clear tag.
  - **Can plastic tags be numbered?** — Ask for sequential numbering or a barcode area in your quote request.
- **related:** custom-hang-tags · pvc-gumming-stickers · dtf-heat-transfer-stickers · vinyl-gumming-stickers
- **quoteHints:** size _e.g. 2 × 4 in_ · quantity _e.g. 3,000 tags_ · material _e.g. Frosted PVC_
- **image alts:** 1 _Frosted plastic product tags with printed logo on a light grey background_ · 2 _Transparent PVC tag on swimwear_ · 3 _White plastic plant tags in a nursery pot_ · 4 _Die-cut plastic tags with holes in a fanned stack_

---

## 7. Policy pages

Authored as Markdown in `src/content/policies/<slug>.md` with frontmatter `title`, `description`, `updated: 2026-11-01`. Tokens resolve from `business.ts`. **Numbers marked † must be confirmed by the owner** (§9) before launch.

### 7.1 Privacy Policy — `/privacy-policy`

**Intro:** How VasuPrint handles your information, artwork files and order data with care and transparency.

**Last updated:** 1 November 2026

This Privacy Policy explains how {{business.legalName}} ("VasuPrint", "we", "us") collects, uses, shares and protects personal data when you visit vasuprint.com, request a quotation, share artwork or place an order with us. We process personal data in accordance with India's Digital Personal Data Protection Act, 2023 ("DPDP Act").

#### 1. Information we collect

Because VasuPrint manufactures customized packaging boxes, stickers, DTF and UV DTF transfers and tags to order, we collect only the information needed to quote, produce and deliver your order:

- **Contact details:** your full name, company name, email address, phone number and WhatsApp number when you submit our quote or contact forms, call us, email us or message us on WhatsApp.
- **Order specifications:** product category, sizes, quantities, material and finishing preferences, delivery city and state, and any notes you provide.
- **Artwork and print files:** design files (such as CDR, AI, EPS, PDF, PSD, SVG, PNG, JPG, TIFF or ZIP), logos, dielines and branding instructions that you upload or send to us.
- **Billing and delivery details:** billing name and address, GSTIN for B2B tax invoices, delivery address, PIN code and recipient phone number.
- **Payment records:** transaction reference numbers, UPI references or bank transfer confirmations. We do **not** collect or store card numbers or banking passwords.
- **Technical data:** basic device and usage information collected by our analytics tools (see section 5). We store a one-way hashed form of your IP address with quote requests for security purposes; we do not store your raw IP address.

#### 2. How we use your information

We use your data only for these purposes:

- To review your requirements and prepare quotations.
- To prepare artwork proofs, produce, inspect and pack your order.
- To arrange dispatch and delivery with courier and transport partners.
- To communicate with you about your enquiry, proofs, production and dispatch by WhatsApp, phone or email.
- To issue GST-compliant invoices and maintain accounting records as required by Indian law.
- To protect our website against spam, fraud and misuse.

We do not send marketing messages unless you ask us to.

#### 3. Consent

When you submit a quote request, you consent to us processing your details for the purposes above. You may withdraw consent at any time by contacting us (section 9). Withdrawal does not affect processing already carried out, or records we must keep by law.

#### 4. Protection of your artwork and intellectual property

We treat your artwork, logos and designs as confidential. Your files are used only to quote and produce the work you request. We do not sell, license, share or reuse your designs for any other customer or purpose, and we do not display your work publicly without your written permission.

#### 5. Cookies and analytics

Our website uses essential cookies needed for the site to work and Google Analytics to understand how visitors use the site (for example, which pages are visited and how fast they load). Analytics data is aggregated and is not used to identify you. Our quote form is protected by Cloudflare Turnstile, which checks that a real person is submitting the form. You can block or delete cookies in your browser settings; some features may not work as expected.

#### 6. Who we share information with

**We never sell your personal data.** We share only what is necessary, with:

- **Courier and logistics partners** — name, delivery address, PIN code and phone number, to deliver your order.
- **Service providers who help us run the website** — our hosting provider, database provider (MongoDB Atlas, data hosted in India), email delivery provider, Cloudflare (spam protection) and Google (analytics). They process data only on our instructions.
- **Authorities** — where required by Indian law, for example for tax (GST) compliance or a lawful request from a government agency.

#### 7. How long we keep your data

We keep quote requests, order records and artwork files so we can handle repeat orders, reprints and after-sales support. Tax and accounting records are kept for the period required by Indian law. You can ask us to delete your quote requests and artwork at any time (section 8); we will do so unless we are legally required to keep them.

#### 8. Data security

We use reasonable technical and organizational measures to protect your data, including:

- SSL/TLS encryption across our website.
- Artwork files stored on a secured server, not publicly accessible, and downloadable only by authorized VasuPrint staff.
- Access to enquiries and order records limited to authorized team members.
- Encrypted backups.

No system is completely secure, but we work to protect your information and will notify you and the authorities as required by law if a breach affects your data.

#### 9. Your rights

Under the DPDP Act you have the right to:

- **Access** a summary of the personal data we hold about you.
- **Correct or update** inaccurate or incomplete data.
- **Erase** your data, subject to legal retention requirements.
- **Withdraw consent** for processing.
- **Nominate** another person to exercise your rights in the event of death or incapacity.
- **Raise a grievance** with us and, if unresolved, with the Data Protection Board of India.

To exercise these rights, contact us using the details below. We aim to respond within 30 days.

#### 10. Children

Our website and services are intended for businesses and are not directed at children. We do not knowingly collect data from anyone under 18.

#### 11. Changes to this policy

We may update this policy from time to time. The "Last updated" date at the top shows when it last changed.

#### 12. Contact and grievance officer
{{business.legalName}}
Address: {{business.address}}
Email: {{business.email}}
Phone / WhatsApp: {{business.phoneDisplay}}

**Page CTA:** Contact on WhatsApp · Contact Page

---

### 7.2 Terms & Conditions — `/terms-and-conditions`

**Intro:** Please read these terms carefully before placing a custom printing or packaging order with VasuPrint.

**Last updated:** 1 November 2026

By using vasuprint.com, requesting a quotation, sharing artwork or confirming an order with VasuPrint through our website, WhatsApp, phone, email or in person, you agree to these Terms & Conditions.

#### 1. About us

These terms govern the business relationship between {{business.legalName}} ("VasuPrint", "we", "us"), operating from {{business.address}}, GSTIN {{business.gstin}}, and you, the customer ("you", "the client").

#### 2. Products and services

VasuPrint manufactures customized printing and packaging products to order, including:

- **Packaging boxes:** mono carton boxes, SBS boxes and duplex boxes.
- **Stickers:** paper, vinyl and PVC gumming stickers, die-cut stickers and offset-printed stickers.
- **DTF stickers:** DTF transfer stickers, gang sheets and DTF heat transfer stickers.
- **UV DTF stickers:** UV DTF stickers and custom UV transfer stickers.
- **Tags:** hang tags, plastic tags and die-cut tags.

Product descriptions, specifications and images on our website are for guidance. The specification in your approved quotation and proof is what we produce.

#### 3. Quotation, proof and order confirmation

Because every order is made to your specification, we follow this process:

1. **Enquiry and artwork:** you share your requirements — product, size, material, quantity, finishing and artwork — through our quote form, WhatsApp or email.
2. **Quotation:** we review your requirements and share a quotation. Quotations are valid for **15 days**† from the date issued, unless stated otherwise.
3. **Proof:** we share a digital proof or size layout. You must check it carefully — spelling, colors, sizes, layout, barcodes and legal text — and approve it in writing (WhatsApp or email).
4. **Confirmation:** an order is confirmed only after written proof approval **and** receipt of the required advance payment.

**Important:** once a proof is approved and production has started, changes to design, size, text or quantity cannot be accepted. Corrections after approval may be charged as a new order.

#### 4. Pricing and taxes

- Prices depend on size, material, quantity, printing, finishing and artwork complexity. Higher quantities usually reduce the unit price.
- All prices are subject to Goods and Services Tax (GST) as applicable. A GST invoice is issued for every order.
- Shipping charges are quoted separately unless your quotation states otherwise.

#### 5. Payment terms

As all items are made to order and cannot be resold:

- **DTF and UV DTF print-only orders:** 100 % advance† before production.
- **Packaging boxes, stickers and tags:** a minimum 50 % advance† to start production, with the balance payable before dispatch†.
- **Payment methods:** UPI, IMPS, NEFT or RTGS bank transfer, or as stated in your quotation.
- Production starts only after payment is received in our account or confirmed by our accounts team.

#### 6. Quantities

For custom manufactured items, the delivered quantity may vary slightly from the ordered quantity due to production setup and wastage. Any variance will be billed or credited at the quoted unit rate, within a tolerance of **±5 %**†.

#### 7. Your artwork and intellectual property

- You confirm that you own, or have permission to use, all logos, trademarks, text, images and designs you send to us.
- VasuPrint is not responsible for any copyright or trademark infringement arising from artwork you provide. You agree to indemnify VasuPrint against any claims, costs or damages resulting from such infringement.
- You are responsible for the accuracy of all content in your artwork, including regulatory information such as MRP, ingredients, batch details and statutory declarations.
- We may refuse any order we consider unlawful, offensive or infringing.

#### 8. Quality and color

- We follow your approved specification and proof and check every order before dispatch.
- Screens display color in RGB, while printing uses CMYK and spot inks on physical materials. A small variation between on-screen color and printed output, and minor variation between production batches, is normal and is not a defect. Pantone matching is available on request where the process allows.
- Low-resolution artwork will print with visible pixelation. We will point out obvious resolution problems before production where we notice them, but final responsibility for artwork quality rests with you.
- DTF and UV DTF transfers must be applied according to the instructions we provide. We are not responsible for results from incorrect temperature, time, pressure or surface preparation.

#### 9. Delivery

Production and delivery timelines are estimates and begin after proof approval and payment confirmation. See our [Shipping Policy](/shipping-policy) for details.

#### 10. Cancellations, defects and refunds

See our [Refund & Cancellation Policy](/refund-policy).

#### 11. Limitation of liability

To the maximum extent permitted by law:

- VasuPrint is not liable for indirect, incidental or consequential losses, including loss of profit, missed deadlines, product launch delays or damage to reputation.
- Our total liability for any claim relating to an order will not exceed the amount you paid for that order.

#### 12. Force majeure

We are not responsible for delays or failures caused by events beyond our reasonable control, including power outages, machine breakdowns, shortages of raw materials, natural disasters, extreme weather, strikes, transport disruptions, epidemics or government restrictions.

#### 13. Governing law and jurisdiction

These terms are governed by the laws of India. Any dispute will be subject to the exclusive jurisdiction of the courts at {{business.jurisdictionCity}}.

#### 14. Changes to these terms

We may update these terms from time to time. The version published on our website when you confirm an order applies to that order.

#### 15. Contact

{{business.legalName}} · {{business.address}} · GSTIN {{business.gstin}}
Email: {{business.email}} · Phone / WhatsApp: {{business.phoneDisplay}}

**Page CTA:** Speak with us on WhatsApp · Contact Page

---

### 7.3 Shipping & Delivery Policy — `/shipping-policy`

**Intro:** How we produce, pack and deliver your custom printing and packaging orders across India.

**Last updated:** 1 November 2026

VasuPrint works with established courier and surface transport partners to deliver orders safely across India.

#### 1. Delivery coverage

We deliver across India through courier and logistics partners. Delivery to remote areas may take longer or require transport by surface cargo. International shipping is not offered at this time.

#### 2. Production timelines

Every order is made to order, so delivery time = **production time + transit time**. Production starts only after you approve the proof and your advance payment is confirmed. Typical production times†:

| Product                       | Typical production time†                               |
| ----------------------------- | ------------------------------------------------------ |
| DTF and UV DTF stickers       | 2–4 business days                                      |
| Paper, vinyl and PVC stickers | 4–7 business days                                      |
| Hang tags and plastic tags    | 5–8 business days                                      |
| Packaging boxes               | 8–15 business days, depending on quantity and finishes |

Large quantities, special finishes (foil, embossing, soft-touch) and custom dies can add time. Your quotation will confirm the expected timeline. Urgent orders may be possible on request, depending on capacity.

#### 3. Transit times

After dispatch, typical transit times† are:

| Destination                                                   | Typical transit time† |
| ------------------------------------------------------------- | --------------------- |
| Within the same city / region                                 | 1–2 business days     |
| Metro cities                                                  | 2–4 business days     |
| Tier 2 and Tier 3 cities                                      | 3–6 business days     |
| North-East, Jammu & Kashmir, Ladakh, islands and remote areas | 5–10 business days    |

Sundays and public holidays are non-working days for production and most courier hubs. Weather, festivals and regional restrictions can occasionally cause delays.

#### 4. Shipping charges

- Shipping is calculated on the actual or volumetric weight (whichever is higher) and the delivery PIN code.
- Shipping charges are shown in your quotation before you confirm the order — there are no hidden handling fees added at dispatch.
- Any free or subsidised delivery will be confirmed in writing in your quotation.

#### 5. Packaging

We pack every order to protect it in transit:

- **Boxes and cartons:** flat-packed in bundles, wrapped and packed in strong corrugated cartons.
- **Stickers and labels:** sheets packed flat with stiff board; rolls packed upright to protect edges.
- **DTF and UV DTF transfers:** packed flat or rolled in protective sleeves and tubes to prevent creasing.
- **Tags:** bundled and packed in cartons to prevent bending.

Moisture-protective wrapping is used where needed, especially during the monsoon.

#### 6. Tracking

Once your order is handed to the courier, we share the tracking number and link by WhatsApp or email.

#### 7. Delivery attempts and returned shipments

- Please provide a complete address with landmark, correct PIN code and an active phone number.
- Couriers usually make 2–3 delivery attempts.
- If a shipment is returned to us because of an incorrect address, unavailable recipient or refusal to accept, the customer pays the return and re-dispatch charges.

#### 8. Bulk and heavy orders

Large or heavy orders may be shipped by surface transport or transport partners to your nearest depot or door, as agreed in your quotation. Unloading at the destination is the customer's responsibility unless agreed otherwise.

#### 9. Self-pickup

You can choose to collect your order from our facility at {{business.address}} by prior appointment, or arrange your own courier or transport pickup once we confirm the order is packed.

#### 10. Damage in transit

If your package arrives damaged, follow the steps in our [Refund & Cancellation Policy](/refund-policy), section 4.

#### 11. Contact

For dispatch and delivery questions: WhatsApp / Phone {{business.phoneDisplay}} · Email {{business.email}}

**Page CTA:** Check order status on WhatsApp · Contact Page

---

### 7.4 Refund & Cancellation Policy — `/refund-policy`

**Intro:** Clear policies on cancellations, defects, transit damage and refunds for custom-made orders.

**Last updated:** 1 November 2026

Every box, sticker, transfer and tag we make is customized with your artwork and specification. Because custom products cannot be resold, standard retail return policies do not apply. This policy explains when we cancel, reprint or refund.

#### 1. Custom-made products

Once materials have been cut, printed or processed for your order, they cannot be used for any other customer. For this reason, we do not accept returns for change of mind, design changes after approval, or ordering errors in the approved specification.

#### 2. Cancellations

- **Before production starts:** if you cancel before we have started pre-press or production (plate making, die making, file processing or printing), we refund 100 % of your advance payment. If a custom die or plate has already been made for your order, its cost may be deducted.
- **After production starts:** once printing, die-cutting or any production step has begun, the order cannot be cancelled, changed or refunded.

#### 3. Manufacturing defects — reprint or replacement

If there is a genuine manufacturing defect, we will reprint or replace the affected items at no extra cost, or refund the value of the affected items if a reprint isn't possible. Manufacturing defects include:

- Printing faults such as banding, smudging, missing colors or misregistration that differ noticeably from the approved proof.
- Sizes or dimensions that differ noticeably from the approved specification.
- Wrong material or finish compared with the approved quotation.
- Cutting, folding or gluing faults that make boxes, stickers or tags unusable.
- For DTF transfers: adhesion failure when applied according to our instructions.

**Reporting window:** report defects within **48 hours**† of delivery with clear photos (and video where relevant) and your order reference.

#### 4. Damage in transit

We pack every order carefully, but if a shipment is damaged by the courier:

- **Record an unboxing video:** a continuous, unedited video of opening the package, showing the shipping label, the outer condition of the package and the damaged items.
- **Report within 24 hours**† of delivery, sharing the video and photos.
- Once verified, we will reprint or replace the damaged items at no additional cost.

Claims without an unboxing video, or reported after the deadline, may not be accepted, as courier claims require this evidence.

#### 5. What is not covered

The following are not defects and do not qualify for reprints or refunds:

- Normal variation between on-screen colors (RGB) and printed colors (CMYK/spot inks), and minor variation between batches.
- Low-resolution, blurry or incorrect artwork supplied by the customer.
- Spelling, content or design errors that were present in the proof you approved.
- Incorrect application of DTF or UV DTF transfers (wrong temperature, time, pressure, surface or preparation).
- Damage caused by improper storage, handling or use after delivery.
- Quantity variations within the tolerance stated in our Terms & Conditions.

#### 6. Refund process

- Approved refunds are made to the original payment method or to your business bank account.
- We initiate approved refunds within **3 business days**†. Depending on your bank, the amount usually reflects within 5–10 business days.
- We share confirmation by WhatsApp or email once the refund is processed.

#### 7. How to raise a claim

1. Message us on WhatsApp at {{business.phoneDisplay}} or email {{business.email}}.
2. Share your order reference or invoice number and the delivery date.
3. Attach clear photos of the issue and the unboxing video for transit damage.

Our team will review your claim and respond within **2 business days**† with a resolution.

**Page CTA:** Report an issue on WhatsApp · Contact Page

---

## 8. Forms, system pages and microcopy

### 8.1 Get a Quote page

- Eyebrow **GET A QUOTE** · H1 **Tell us what you need** · lead _Share your specifications and our team will get back to you with product options and a quotation._
- Fieldset legends: **1. Product details** · **2. Artwork** · **3. Your details**
- Labels exactly as `PRD.md` §6.2.
- Generic placeholders: size _e.g. 100 × 50 mm or 4 × 2 in_ · quantity _e.g. 5,000 pcs_ · material _e.g. 350 GSM SBS, white vinyl_ · finishing _e.g. matte lamination, spot UV, gold foil on logo_ · city _e.g. Pune_ · additional _Deadlines, sample requests, reference products…_
- Dropzone: **Drag files here or browse** · _CDR, AI, EPS, PDF, PSD, SVG, PNG, JPG, TIFF or ZIP · up to 3 files · 100 MB each_
- Consent: _I agree to VasuPrint contacting me about this enquiry and processing my details as described in the [Privacy Policy](/privacy-policy)._
- Submit: **Request a Quote** (owner-approved)
- Side panel: **What happens next** — 1 We review your specifications · 2 You receive a quotation on WhatsApp or email · 3 We share an artwork proof for approval · 4 Production and dispatch. **Prefer to talk?** WhatsApp · Call · Email. Privacy note: _Your files stay private and are used only for your order._

### 8.2 Thank-you page

- H1 **Thank you — we've received your request**
- Reference label: _Your reference_
- Text: _Our team will review your specifications and get back to you on WhatsApp or email, usually within one business day†._
- Buttons: **Chat on WhatsApp** · **Continue browsing**

### 8.3 404

- H1 **This page didn't make the cut**
- Text: _The page you're looking for may have moved or no longer exists. Try one of our product categories below._
- Buttons: **Go to homepage** · **Browse products**

### 8.4 Admin emails — see `API.md` §5.

---

## 9. Owner verification checklist

Confirm or correct each item before public launch (P4). Items marked † in the text above:

| #   | Item                                                           | Where            | Current text                                                   |
| --- | -------------------------------------------------------------- | ---------------- | -------------------------------------------------------------- |
| 1   | Quotation validity                                             | Terms §3         | 15 days                                                        |
| 2   | Advance payment rules                                          | Terms §5         | 100 % for DTF/UV DTF; 50 % for others; balance before dispatch |
| 3   | Quantity tolerance                                             | Terms §6         | ±5 %                                                           |
| 4   | Production times by product                                    | Shipping §2      | 2–4 / 4–7 / 5–8 / 8–15 business days                           |
| 5   | Transit times                                                  | Shipping §3      | 1–2 / 2–4 / 3–6 / 5–10 business days                           |
| 6   | Self-pickup available                                          | Shipping §9      | Yes, by appointment                                            |
| 7   | Defect reporting window                                        | Refund §3        | 48 hours                                                       |
| 8   | Transit damage window + unboxing video                         | Refund §4        | 24 hours, video required                                       |
| 9   | Refund initiation / response times                             | Refund §6–7      | 3 business days / 2 business days                              |
| 10  | Reply time promise                                             | Thank-you page   | usually within one business day                                |
| 11  | "Pan-India dispatch" claim                                     | Trust strip      | Ships across India                                             |
| 12  | GSM / thickness ranges and listed materials, finishes, formats | Product specs §6 | As written                                                     |
| 13  | Food-grade SBS available                                       | SBS page         | On request                                                     |
| 14  | Pantone matching offered                                       | Several pages    | On request                                                     |
| 15  | Business details (all `{{business.*}}` tokens)                 | `business.ts`    | Placeholders                                                   |
| 16  | Payment methods                                                | Terms §5         | UPI, IMPS/NEFT/RTGS                                            |

# VasuPrint — Asset Generation Prompts

v1 uses AI-generated imagery so the site looks finished before a photoshoot. Every image must look like it came from **one consistent studio shoot**. Use the shared style block in every prompt. Real photography should replace these images over time — keep the same framing so swaps are drop-in.

> AI images are illustrative. Do not generate images that show certifications, awards, real brand names, readable fake text, people's faces in close-up, or machinery that VasuPrint doesn't have. Product mock-ups use the neutral placeholder brand **"Lumen & Co."**, a simple abstract mark, or no logo at all.

---

## 1. Shared settings

### 1.1 Style block (append to every product/category prompt)

```
Style: premium commercial studio product photography, soft diffused daylight from upper left, gentle natural shadows, seamless light grey background (#F1F4F7), subtle paper texture visible, shallow depth of field, crisp focus on the product, realistic materials, high dynamic range, color palette accents of deep navy (#102B46) and teal (#00A6A6) where natural, clean minimal composition with generous negative space, shot on a full-frame camera with a 100mm lens, photorealistic, 8k detail.
```

### 1.2 Negative prompt (if the tool supports it)

```
text, words, letters, watermark, logo of real brands, signature, cluttered background, people's faces, hands with extra fingers, distorted packaging, warped edges, plastic-looking CGI, oversaturated colors, harsh shadows, lens flare, low resolution, blurry, frame, border, collage, mockup template look
```

### 1.3 Output specs

| Use                             | Aspect      | Generate at   | Export                                   | Path                                      |
| ------------------------------- | ----------- | ------------- | ---------------------------------------- | ----------------------------------------- |
| Product gallery (4 per product) | 4:3         | ≥ 2048 × 1536 | WebP q80, 1600 × 1200                    | `public/images/products/<slug>/<n>.webp`  |
| Product card (crop of image 1)  | 1:1         | —             | WebP q80, 800 × 800                      | `public/images/products/<slug>/card.webp` |
| Product OG (crop of image 1)    | 1.91:1      | —             | JPG q82, 1200 × 630                      | `public/images/products/<slug>/og.jpg`    |
| Category                        | 4:3         | ≥ 2048 × 1536 | WebP q80, 1600 × 1200                    | `public/images/categories/<slug>.webp`    |
| Home hero                       | 4:3         | ≥ 2400 × 1800 | WebP q80, 2000 × 1500 (+ 1200 w variant) | `public/images/hero/home.webp`            |
| About / contact / CTA           | 16:9 or 4:3 | ≥ 2400 w      | WebP q80, 1920 w                         | `public/images/pages/<name>.webp`         |
| Default OG                      | 1.91:1      | —             | JPG q82, 1200 × 630                      | `public/images/brand/og-default.jpg`      |

Post-processing script: `scripts/optimize-images.ts` (sharp) converts, resizes, strips metadata and writes `card.webp` / `og.jpg` crops (centre-weighted, adjustable via a `focal` map in the script).

Consistency checklist for every batch: same background tone, same light direction, same camera angle per image slot (below), no readable text, product fills 55–70 % of the frame, ≥ 10 % padding on all sides.

### 1.4 Image slots per product

| Slot | Shot                                                                   |
| ---- | ---------------------------------------------------------------------- |
| 1    | **Hero** — product group, 3/4 angle (30° above, 35° rotation), centred |
| 2    | **In use / context** — product applied or being used, close framing    |
| 3    | **Detail / format** — stack, roll, sheet or open structure             |
| 4    | **Macro** — finish or material close-up                                |

---

## 2. Logo

The final logo is **built in SVG code** (crisp at all sizes, editable). AI generation is used only to explore concepts.

### 2.1 Concept exploration prompt

```
Minimal modern logo concept for "VasuPrint", a premium B2B printing and packaging manufacturer. A geometric symbol combining a folded paper corner with printer's crop marks, forming an abstract letter V. Deep navy #102B46 and teal #00A6A6 on white. Flat vector style, no gradients, no 3D, no mockup, centred on a white background, generous margins. Wordmark "VasuPrint" in a bold geometric sans-serif with tight letter spacing, "Vasu" in navy and "Print" in teal. Clean, confident, engineered, suitable for a corporate website header and favicon.
```

Generate 8–12 options; pick one direction; recreate in SVG to the spec below.

### 2.2 SVG build spec (default if no concept is chosen)

- **Mark:** 40 × 40 viewBox. A navy-800 rounded square (radius 9) with the top-right corner "folded" (a 12 px right triangle in teal-500 sitting over the cut corner). Inside, a bold white "V" made of two 5 px strokes meeting at the bottom centre. Four tiny teal crop-mark ticks (1.5 px stroke, 4 px long) outside each corner at 50 % opacity in the large version only.
- **Wordmark:** "VasuPrint" set in Manrope ExtraBold (800), letter-spacing -0.03em, converted to outlines. "Vasu" navy-800, "Print" teal-500 (contrast acceptable at ≥ 24 px; the header renders it at 28 px). Baseline aligned to the mark's bottom; gap between mark and wordmark = 0.3 × mark height.
- **Files** (`public/images/brand/`): `logo.svg` (horizontal, colour), `logo-white.svg` (all white + teal fold, for footer/navy), `mark.svg`, `favicon.svg` (mark only), `favicon.ico` (16/32/48), `apple-touch-icon.png` (180, mark on white with 20 px padding), `icon-192.png`, `icon-512.png`.
- Clear space = height of the "V" stroke width × 4 around the logo. Minimum width 120 px (horizontal), 20 px (mark).

### 2.3 Default OG image prompt (then overlay logo in code/Figma)

```
Abstract premium background for a printing company social share image: deep navy #102B46 field with very thin teal #00A6A6 die-cut dieline drawings of an unfolded box and printer's crop marks and registration marks, subtle paper grain, elegant, minimal, lots of empty space on the left third for a logo, flat lighting, 1200x630 composition, no text.
```

---

## 3. Site imagery

### 3.1 Home hero — `hero/home.webp`

```
A curated flat-lay arrangement on a light grey surface viewed from a 30-degree high angle: a matte navy custom printed mono carton box with subtle foil detailing, a bright white SBS box, a roll of glossy product labels, a sheet of colorful DTF transfer designs partly rolled, a glass jar with a raised glossy UV DTF decal, and a small bundle of kraft hang tags with cotton string. Objects slightly overlapping in a balanced asymmetrical composition, generic abstract logos only, no readable text.
+ Style block
```

### 3.2 Category images

`categories/packaging-boxes.webp`

```
Group of custom printed folding carton boxes in different sizes and finishes — matte navy box with gold foil, white premium SBS box with teal accent band, grey-back duplex box shown open — arranged in a staggered row on a light grey seamless background, 3/4 angle, generic abstract logo marks, no readable text.
+ Style block
```

`categories/custom-stickers.webp`

```
An arrangement of custom printed stickers and labels: a roll of glossy paper labels, a sheet of die-cut vinyl logo stickers, transparent vinyl label on a glass bottle, silver metallic PVC sticker, scattered loose die-cut stickers in navy, teal and white, on a light grey seamless background, generic shapes and abstract logos, no readable text.
+ Style block
```

`categories/dtf-stickers.webp`

```
A folded black cotton T-shirt with a vibrant full-color DTF printed graphic on the chest, beside a partially peeled DTF transfer sheet showing several colorful designs on clear film, and a stack of pre-cut DTF logo transfers, on a light grey seamless background, abstract illustration designs, no readable text.
+ Style block
```

`categories/uv-dtf-stickers.webp`

```
Hard-surface products decorated with glossy raised UV DTF decals: a clear glass jar, a matte black stainless steel tumbler, an acrylic phone stand and a white ceramic mug, each with a colorful abstract floral or geometric decal, a UV DTF sheet with carrier film in the foreground, on a light grey seamless background, no readable text.
+ Style block
```

`categories/custom-tags.webp`

```
A fanned group of premium hang tags: black card tag with gold foil abstract logo, natural kraft tag with cotton string, white tag with metal eyelet, and a frosted plastic tag, laid over a folded neutral linen shirt on a light grey surface, no readable text.
+ Style block
```

### 3.3 Page images

`pages/about.webp` — `A clean, well-organized print finishing workspace: neatly stacked printed cartons, rolls of labels and a cutting mat with a steel ruler, soft daylight through a large window, shallow depth of field, no people's faces, no readable text, calm premium atmosphere. + Style block (background may be a real interior in soft focus instead of seamless grey)`

`pages/contact.webp` — `Close-up of a desk with a printed packaging dieline sheet, color swatch fan, a sample carton and a smartphone face-down, soft daylight, navy and teal accents, minimal, no readable text. + Style block`

`pages/cta-texture.webp` — `Seamless abstract texture of deep navy #102B46 paper with extremely subtle embossed dieline lines, very low contrast, for use as a section background, no text.`

`pages/404.webp` — not needed (uses the SVG `DielineFrame` motif).

---

## 4. Product images (13 × 4)

Append the style block to every prompt. Use the generic brand "Lumen & Co." mark (a simple circle-and-line symbol) where a logo is needed, or no logo.

### 4.1 Mono Carton Boxes — `products/mono-carton-boxes/`

1. `Three custom printed reverse-tuck-end mono carton boxes for a skincare product, matte navy with a thin gold foil border and an abstract circle logo, one standing, one lying, one slightly open showing a white interior, 3/4 angle.`
2. `A hand placing a small cosmetic bottle into an open matte mono carton box, close framing on the box and hand, neutral manicure, no face.`
3. `A neat stack of flat-packed printed mono cartons with die-cut flaps visible, top-down 3/4 view, navy and white designs.`
4. `Macro close-up of a mono carton surface showing glossy spot UV over a matte lamination and a subtle embossed logo, raking light to reveal texture.`

### 4.2 SBS Boxes — `products/sbs-boxes/`

1. `Premium bright white SBS paperboard boxes for perfume, soft-touch finish with silver foil abstract monogram and a thin teal band, one tall rectangular box and one square box, 3/4 angle.`
2. `An elegant glass perfume bottle beside its open white SBS box with a paperboard insert, close framing.`
3. `Edge detail of a cut white SBS paperboard sheet showing a pure white core and smooth coated surface, several sheets fanned.`
4. `Macro of a blind-embossed abstract logo on bright white soft-touch SBS board, side lighting.`

### 4.3 Duplex Boxes — `products/duplex-boxes/`

1. `Colorful printed duplex board retail boxes for household products in three sizes, bold teal, navy and white graphics with abstract shapes, one box with a euro-slot hang tab, 3/4 angle.`
2. `An open duplex box showing the grey back interior with a toy car partially inside, close framing.`
3. `Duplex boxes hanging from a retail peg by their euro-slot tabs, shallow depth of field.`
4. `Macro of the edge of duplex board showing white coated top layer and grey back layers.`

### 4.4 Paper Gumming Stickers — `products/paper-gumming-stickers/`

1. `A roll of glossy printed paper product labels partially unrolled, beside three small glass jars with matching round and rectangular paper labels in navy and teal, 3/4 angle.`
2. `A hand applying a rectangular paper label to a kraft pouch, close framing.`
3. `A sheet of round printed paper stickers with one sticker half peeled from the liner, top-down angle.`
4. `Macro of a glossy chromo paper label showing sharp fine print patterns and the label edge lifting from the backing.`

### 4.5 Vinyl Gumming Stickers — `products/vinyl-gumming-stickers/`

1. `White glossy vinyl labels wrapped smoothly around three cosmetic plastic bottles in navy, white and teal, 3/4 angle.`
2. `A transparent vinyl label with a minimal white and teal design on a clear glass bottle so the label looks printed directly on the glass, close framing.`
3. `A roll of white vinyl labels with die-cut oval shapes, standing on its edge.`
4. `Macro of water droplets beading on a glossy vinyl label on a bottle, showing water resistance.`

### 4.6 PVC Gumming Stickers — `products/pvc-gumming-stickers/`

1. `A brushed silver metallic PVC specification label with abstract icons on the side panel of a white home appliance, 3/4 angle.`
2. `A transparent PVC sticker on a translucent industrial plastic container, close framing.`
3. `A sheet of thick white PVC labels with rounded die-cut corners, slightly lifted to show thickness.`
4. `Macro of a gold metallic PVC logo sticker with reflective sheen, raking light.`

### 4.7 Die-Cut Stickers — `products/die-cut-stickers/`

1. `An assortment of custom die-cut vinyl stickers in playful abstract shapes — a cloud, a leaf, a lightning bolt, a circle badge — in navy, teal, white and coral, scattered on a light grey surface, top-down 3/4 angle.`
2. `A kiss-cut sticker sheet with several die-cut shapes, one being peeled by a hand, close framing.`
3. `Die-cut stickers applied as seals on kraft mailer boxes and a paper bag, 3/4 angle.`
4. `Macro of the precise cut edge of a white-bordered die-cut sticker lifting from its backing.`

### 4.8 DTF Transfer Stickers — `products/dtf-transfer-stickers/`

1. `A large DTF transfer gang sheet filled with many vibrant full-color abstract illustrations and badges on clear PET film, partially rolled at one end, lying on a light grey surface, 3/4 angle.`
2. `A hand peeling the clear film away from a freshly pressed colorful DTF print on a black cotton T-shirt, close framing.`
3. `An industrial heat press closed on a white T-shirt, shallow depth of field, clean modern studio, no people's faces.`
4. `Macro of a DTF print on cotton fabric showing vivid colors, fine detail and fabric weave texture.`

### 4.9 DTF Heat Transfer Stickers — `products/dtf-heat-transfer-stickers/`

1. `A neat stack of identical pre-cut DTF heat transfer logo stickers — a simple teal and white circular abstract emblem — fanned out on a light grey surface, 3/4 angle.`
2. `Inside the collar of a navy T-shirt showing a printed tagless neck label with abstract size icons, close framing, no readable text.`
3. `A small chest logo applied with DTF on a white polo shirt, folded neatly.`
4. `A sheet of identical pre-cut DTF logo transfers on their carrier film, top-down.`

### 4.10 UV DTF Stickers — `products/uv-dtf-sticker-printing/`

1. `A clear glass storage jar with a vibrant raised glossy UV DTF floral decal, beside a UV DTF transfer sheet with several decals, 3/4 angle.`
2. `A hand pressing a UV DTF decal onto a matte black stainless steel tumbler and lifting the clear carrier film, close framing.`
3. `Extreme close-up of the raised glossy varnish texture of a UV DTF print catching the light.`
4. `A UV DTF decal sheet with clear carrier film partially peeled back, top-down angle.`

### 4.11 Custom UV Transfer Stickers — `products/custom-uv-transfer-stickers/`

1. `A frosted glass cup with a full wraparound custom UV transfer design of abstract waves in navy and teal, on a light grey surface, 3/4 angle.`
2. `A brushed stainless steel tumbler with a small glossy UV transfer abstract logo, close framing.`
3. `An elegant perfume bottle with a raised glossy UV transfer label, soft reflections.`
4. `A curated corporate gift set — notebook, metal bottle, acrylic desk plaque — each with the same abstract UV transfer logo, flat-lay.`

### 4.12 Custom Hang Tags — `products/custom-hang-tags/`

1. `A group of premium hang tags — matte black card with gold foil abstract monogram, natural kraft tag, white tag with teal edge — with cotton strings, fanned on a light grey surface, 3/4 angle.`
2. `A kraft hang tag with a navy abstract logo attached by jute string to a neatly folded linen shirt, close framing.`
3. `Die-cut hang tags in custom shapes with metal eyelets, stacked and fanned.`
4. `Macro of a deep embossed abstract logo on a thick black hang tag with gold foil, raking light.`

### 4.13 Plastic Tags — `products/plastic-tags/`

1. `Frosted translucent plastic product tags with a printed navy abstract logo, fanned on a light grey surface, 3/4 angle.`
2. `A transparent PVC tag with white printing attached to swimwear by a clear loop, close framing.`
3. `White plastic plant tags inserted into small terracotta pots with seedlings, soft natural light.`
4. `A stack of die-cut plastic tags with punched holes, slightly fanned to show thickness and edge.`

---

## 5. Review before committing images

- [ ] No readable text, real brand names, or garbled pseudo-letters (regenerate or retouch).
- [ ] Packaging geometry is physically plausible (flaps, folds, tuck ends correct).
- [ ] Hands have five fingers and natural proportions.
- [ ] Background tone matches `#F1F4F7` ± small variance across the set.
- [ ] Light comes from upper left in every studio shot.
- [ ] Alt text from `CONTENT.md` matches what the image shows; update alt text if the image differs.
- [ ] Exported via `scripts/optimize-images.ts`; each WebP ≤ 220 KB at 1600 × 1200.

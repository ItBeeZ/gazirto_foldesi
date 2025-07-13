# Gazirtó Földesi - Modern Weboldal

Ez egy modern, letisztult weboldal a Gazirtó Földesi gyomirtási szolgáltatások számára.

## Jellemzők

### Dizájn

- **Modern és letisztult**: Minimális, professzionális megjelenés
- **Reszponzív**: Minden eszközön tökéletesen működik (mobil, tablet, desktop)
- **Zöld színpaletta**: A természetbarát szolgáltatásokat tükrözi
- **Smooth animációk**: Elegáns átmenetek és hover effektek

### Funkciók

- **Egyoldalas (SPA) dizájn**: Minden tartalom egy oldalon
- **Smooth scrolling**: Gördülékeny navigáció a szekciók között
- **Mobil-barát navigáció**: Hamburger menü kisebb képernyőkön
- **Kapcsolati űrlap**: Működő validációval
- **SEO optimalizált**: Keresőbarát struktúra

### Szekciók

1. **Főoldal (Hero)**: Figyelemfelkeltő bevezető szekció
2. **Szolgáltatások**: 6 fő szolgáltatási terület bemutatása
3. **Tippek**: Hasznos tanácsok a gyomirtásról
4. **Partnerek**: Minőségi garanciák és tanúsítványok
5. **Kapcsolat**: Elérhetőségek és kapcsolati űrlap

## Szolgáltatások

- **Kémiai Gyomirtás**: Professzionális, engedélyezett szerekkel
- **Környezetbarát Megoldások**: Természetes alapú módszerek
- **Házikerti Gyomirtás**: Biztonságos házikerti szolgáltatások
- **Ipari Területek**: Nagy területű gyommentesítés
- **Járdák és Utak**: Speciális eszközökkel
- **Rendszeres Karbantartás**: Hosszú távú szerződések

## Technikai Részletek

### Használt Technológiák

- **HTML5**: Szemantikus markup
- **CSS3**: Modern styling, Grid és Flexbox layout
- **Vanilla JavaScript**: Tiszta JavaScript, függőségek nélkül
- **Font Awesome**: Ikonok
- **Google Fonts**: Inter betűtípus

### Fájlstruktúra

```
├── index.html          # Fő HTML fájl
├── styles.css          # CSS stílusok
├── script.js           # JavaScript funkciók
└── README.md           # Dokumentáció
```

## Telepítés és Használat

1. **Egyszerű megnyitás**: Nyissa meg az `index.html` fájlt böngészőben
2. **Helyi szerver**: Használjon egyszerű HTTP szervert a fejlesztéshez

### Helyi szerver indítása

**Python 3-mal:**

```bash
python -m http.server 8000
```

**Node.js-sel:**

```bash
npx serve .
```

**PHP-val:**

```bash
php -S localhost:8000
```

Ezután nyissa meg a böngészőben: `http://localhost:8000`

## Testreszabás

### Színek módosítása

A `styles.css` fájlban módosíthatja a fő színeket:

- Zöld árnyalatok: `#16a34a`, `#22c55e`
- Szürke árnyalatok: `#1f2937`, `#6b7280`

### Tartalom szerkesztése

Az `index.html` fájlban módosíthatja:

- Szövegeket
- Elérhetőségeket
- Szolgáltatások leírását

### Képek hozzáadása

A jelenlegi verzió SVG ikonokat használ. Valódi képek hozzáadásához:

1. Hozzon létre egy `images/` mappát
2. Helyezze el a képeket
3. Módosítsa a HTML-ben a képek elérési útját

## Böngésző Támogatás

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Jövőbeli Fejlesztések

- **CMS integráció**: WordPress vagy más CMS
- **Többnyelvűség**: Magyar/angol verzió
- **Blog szekció**: Gyomirtási tippek és hírek
- **Online árajánlat kérő**: Automatikus kalkulátor
- **Galéria**: Munkák előtte/utána képei
- **Ügyfél vélemények**: Testimonials szekció

## Kapcsolat

Ha kérdése van a weboldallal kapcsolatban, vegye fel a kapcsolatot:

- Email: info@gazirtofoldesi.hu
- Telefon: +36 XX XXX XXXX

---

_Ez a weboldal a Gazirtó Földesi számára készült, modern webes technológiákkal._

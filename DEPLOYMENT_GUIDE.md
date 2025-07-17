# 🚀 Éles Környezet Deployment Útmutató

## 📋 Előfeltételek

### EmailJS Fiók Beállítása

1. **Regisztráció**: [EmailJS.com](https://www.emailjs.com/)
2. **Email szolgáltatás hozzáadása** (Gmail/Outlook/Yahoo)
3. **Email template létrehozása**
4. **API kulcsok megszerzése**

### Szükséges Fájlok

- ✅ `email-config-loader.js` (már létezik)
- ✅ `email-config.js` (már létezik)
- ✅ `email-config-production.example.js` (már létezik)
- ✅ `.gitignore` (már létezik)

---

## 🌐 Hosting Platform Beállítások

### 1. Netlify Deployment

#### Lépések:

1. **Repository feltöltése** GitHub/GitLab-ra
2. **Netlify Dashboard** > New site from Git
3. **Environment Variables beállítása**:
   ```
   EMAILJS_PUBLIC_KEY = your_actual_public_key
   EMAILJS_SERVICE_ID = your_actual_service_id
   EMAILJS_TEMPLATE_ID = your_actual_template_id
   ```
4. **Build settings**:
   - Build command: (ha van build folyamat)
   - Publish directory: `/` (vagy ahol a HTML fájlok vannak)

#### Netlify-specifikus konfiguráció:

```javascript
// netlify.toml fájl (opcionális)
[build];
publish = "."[build.environment];
EMAILJS_PUBLIC_KEY = "your_key_here";
```

### 2. Vercel Deployment

#### Lépések:

1. **Vercel CLI telepítése**: `npm i -g vercel`
2. **Project inicializálása**: `vercel`
3. **Environment Variables**:
   ```bash
   vercel env add EMAILJS_PUBLIC_KEY
   vercel env add EMAILJS_SERVICE_ID
   vercel env add EMAILJS_TEMPLATE_ID
   ```

#### Vercel konfiguráció:

```json
// vercel.json
{
  "functions": {
    "api/*.js": {
      "runtime": "nodejs18.x"
    }
  },
  "env": {
    "EMAILJS_PUBLIC_KEY": "@emailjs-public-key",
    "EMAILJS_SERVICE_ID": "@emailjs-service-id",
    "EMAILJS_TEMPLATE_ID": "@emailjs-template-id"
  }
}
```

### 3. GitHub Pages + Actions

#### GitHub Actions workflow:

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"

      - name: Create production config
        run: |
          cat > js/email-config-production.js << EOF
          window.EMAILJS_CONFIG = {
            publicKey: '${{ secrets.EMAILJS_PUBLIC_KEY }}',
            serviceId: '${{ secrets.EMAILJS_SERVICE_ID }}',
            templateId: '${{ secrets.EMAILJS_TEMPLATE_ID }}'
          };
          console.log('✅ EmailJS production konfiguráció betöltve');
          EOF

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

### 4. Cloudflare Pages

#### Lépések:

1. **Cloudflare Dashboard** > Pages > Create a project
2. **Git repository csatlakoztatása**
3. **Environment Variables**:
   ```
   EMAILJS_PUBLIC_KEY = your_key
   EMAILJS_SERVICE_ID = your_service
   EMAILJS_TEMPLATE_ID = your_template
   ```

---

## 🔧 Konfigurációs Módszerek

### Módszer 1: Build-time Injection (Ajánlott)

1. **Másolja át a production example fájlt**:

   ```bash
   cp js/email-config-production.example.js js/email-config-production.js
   ```

2. **Szerkessze a fájlt** a valódi értékekkel:

   ```javascript
   const PRODUCTION_CONFIG = {
     publicKey: process.env.EMAILJS_PUBLIC_KEY || "your_actual_public_key",
     serviceId: process.env.EMAILJS_SERVICE_ID || "your_actual_service_id",
     templateId: process.env.EMAILJS_TEMPLATE_ID || "your_actual_template_id",
   };
   ```

3. **Adja hozzá a HTML-hez**:
   ```html
   <script src="js/email-config-production.js"></script>
   ```

### Módszer 2: Server-side Rendering

#### PHP példa:

```php
<?php
// config.php
$emailjs_config = [
    'publicKey' => $_ENV['EMAILJS_PUBLIC_KEY'],
    'serviceId' => $_ENV['EMAILJS_SERVICE_ID'],
    'templateId' => $_ENV['EMAILJS_TEMPLATE_ID']
];
?>

<!-- HTML head részben -->
<script>
    window.EMAILJS_CONFIG = <?php echo json_encode($emailjs_config); ?>;
</script>
```

#### Node.js/Express példa:

```javascript
// server.js
app.get("/", (req, res) => {
  const emailjsConfig = {
    publicKey: process.env.EMAILJS_PUBLIC_KEY,
    serviceId: process.env.EMAILJS_SERVICE_ID,
    templateId: process.env.EMAILJS_TEMPLATE_ID,
  };

  res.render("index", { emailjsConfig });
});
```

```html
<!-- EJS template -->
<script>
  window.EMAILJS_CONFIG = <%- JSON.stringify(emailjsConfig) %>;
</script>
```

---

## ✅ Deployment Checklist

### Pre-deployment

- [ ] EmailJS fiók aktív és beállított
- [ ] Email szolgáltatás (Gmail/Outlook) csatlakoztatva
- [ ] Email template létrehozva és tesztelve
- [ ] API kulcsok elmentve biztonságos helyre
- [ ] `.gitignore` fájl beállítva
- [ ] Kód tesztelve fejlesztői környezetben

### Deployment

- [ ] Hosting platform kiválasztva
- [ ] Environment variables beállítva
- [ ] Production konfiguráció létrehozva
- [ ] HTTPS engedélyezve
- [ ] Custom domain beállítva (ha szükséges)

### Post-deployment

- [ ] Weboldal elérhető és működik
- [ ] Kapcsolati űrlap tesztelve
- [ ] Email küldés működik
- [ ] Error monitoring beállítva
- [ ] Performance monitoring
- [ ] Backup stratégia

---

## 🔒 Biztonsági Ellenőrzések

### Kötelező biztonsági lépések:

1. **HTTPS használata** - Soha ne használjon HTTP-t éles környezetben
2. **API kulcsok védelme** - Soha ne commitolja a verziókezelőbe
3. **Rate limiting** - Spam védelem beállítása
4. **Input validáció** - Minden felhasználói bemenet ellenőrzése
5. **Error handling** - Részletes hibakezelés

### Biztonsági tesztek:

```javascript
// Konzolban futtatható tesztek
console.log(
  "EmailJS Config:",
  window.EMAILJS_CONFIG ? "✅ Betöltve" : "❌ Hiányzik"
);
console.log(
  "HTTPS:",
  location.protocol === "https:" ? "✅ Biztonságos" : "❌ Nem biztonságos"
);
```

---

## 🚨 Hibaelhárítás

### Gyakori problémák:

#### 1. "EmailJS konfiguráció nem található"

**Megoldás:**

- Ellenőrizze a environment variables beállítását
- Győződjön meg róla, hogy a production config fájl betöltődik
- Nézze meg a browser console-t hibákért

#### 2. "CORS hiba"

**Megoldás:**

- Ellenőrizze az EmailJS dashboard-ban a domain beállításokat
- Adja hozzá a production domain-t az engedélyezett listához

#### 3. "Rate limit exceeded"

**Megoldás:**

- Ellenőrizze az EmailJS quota-t
- Implementáljon kliens oldali rate limiting-et
- Frissítse az EmailJS csomagot ha szükséges

### Debug módok:

```javascript
// Debug információk
console.log("Environment:", {
  hostname: window.location.hostname,
  protocol: window.location.protocol,
  config: !!window.EMAILJS_CONFIG,
});
```

---

## 📞 Támogatás

### Hasznos linkek:

- [EmailJS Dokumentáció](https://www.emailjs.com/docs/)
- [Netlify Docs](https://docs.netlify.com/)
- [Vercel Docs](https://vercel.com/docs)
- [GitHub Pages Docs](https://docs.github.com/en/pages)

### Vészhelyzeti eljárások:

1. **API kulcs kompromittálódott**: Azonnal váltsa le az EmailJS dashboard-ban
2. **Spam támadás**: Kapcsolja ki ideiglenesen a szolgáltatást
3. **Szolgáltatás kiesés**: Implementáljon fallback megoldást

---

_Utolsó frissítés: 2024_
_Ez az útmutató az éles környezet biztonságos deployment-jére fókuszál._

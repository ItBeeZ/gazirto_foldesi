# EmailJS Gyors Beállítási Útmutató

## EmailJS Fiók és Beállítások

1. Regisztráljon: [emailjs.com](https://www.emailjs.com/)
2. Hozzon létre email service-t (Gmail ajánlott)
3. Hozzon létre template-et az alábbi paraméterekkel:
   - `{{from_name}}`, `{{from_email}}`, `{{phone}}`, `{{service}}`, `{{message}}`
4. Jegyezze fel: **Public Key**, **Service ID**, **Template ID**

---

## 🚀 Éles Környezet Beállítása

### ⚡ Gyors Deployment (Ajánlott)

#### 1. Hosting Platform Beállítása

**Netlify/Vercel/Cloudflare Pages:**

1. Repository feltöltése GitHub-ra
2. Hosting platform csatlakoztatása
3. Environment Variables beállítása:
   ```
   EMAILJS_PUBLIC_KEY = your_actual_public_key
   EMAILJS_SERVICE_ID = your_actual_service_id
   EMAILJS_TEMPLATE_ID = your_actual_template_id
   ```

#### 2. Production Config Létrehozása

```bash
# Másolja át a példa fájlt
cp js/email-config-production.example.js js/email-config-production.js
```

#### 3. HTML Frissítése

```html
<!-- Adja hozzá a head részhez -->
<script src="js/email-config-production.js"></script>
```

### 🔧 Alternatív Módszerek

#### Szerver oldali renderelés (PHP/Node.js)

```html
<!-- PHP példa -->
<script>
  window.EMAILJS_CONFIG = {
    publicKey: '<?php echo $_ENV["EMAILJS_PUBLIC_KEY"]; ?>',
    serviceId: '<?php echo $_ENV["EMAILJS_SERVICE_ID"]; ?>',
    templateId: '<?php echo $_ENV["EMAILJS_TEMPLATE_ID"]; ?>',
  };
</script>
```

#### Docker deployment

```yaml
# docker-compose.yml
version: "3.8"
services:
  web:
    build: .
    environment:
      - EMAILJS_PUBLIC_KEY=your_key
      - EMAILJS_SERVICE_ID=your_service
      - EMAILJS_TEMPLATE_ID=your_template
```

---

## Hibaelhárítás

### "Konfiguráció nem érhető el"

```javascript
// Ellenőrizze a konfigurációt:
console.log(getSecureEmailConfig());
```

### "EmailJS nincs betöltve"

- Ellenőrizze az internetkapcsolatot
- Győződjön meg a script betöltéséről

### Rate limiting

- 1 perc várakozás emailek között
- Max 3 próbálkozás session-ként
- Frissítse az oldalt új session-hez

---

## 🔒 Biztonsági Checklist

### 📋 Éles Környezet Checklist

#### Pre-deployment

- [ ] EmailJS fiók aktív és tesztelve
- [ ] Email szolgáltatás csatlakoztatva
- [ ] Email template létrehozva
- [ ] API kulcsok biztonságos helyen tárolva
- [ ] `.gitignore` fájl beállítva
- [ ] Fejlesztői tesztelés befejezve

#### Deployment

- [ ] Hosting platform kiválasztva
- [ ] Environment variables beállítva
- [ ] Production config létrehozva
- [ ] HTTPS engedélyezve
- [ ] Custom domain beállítva (opcionális)

#### Post-deployment

- [ ] Weboldal elérhető és működik
- [ ] Kapcsolati űrlap tesztelve
- [ ] Email küldés működik
- [ ] Error monitoring aktív
- [ ] Performance monitoring

### 🚨 Kritikus Biztonsági Szabályok

#### ❌ SOHA NE TEGYE:

- API kulcsokat a JavaScript kódba
- Érzékeny adatokat a verziókezelőbe
- Production kulcsokat development környezetben
- HTTP használatát éles környezetben

#### ✅ MINDIG TEGYE:

- Használjon környezeti változókat
- Állítson be `.gitignore` fájlt
- Használjon HTTPS-t
- Implementáljon rate limiting-et
- Validálja a bemeneti adatokat
- Monitorozza a használatot

### 🔧 Gyors Ellenőrzések

#### Browser Console Tesztek:

```javascript
// Konfiguráció ellenőrzése
console.log("Config:", window.EMAILJS_CONFIG ? "✅" : "❌");
console.log("HTTPS:", location.protocol === "https:" ? "✅" : "❌");
console.log("Domain:", location.hostname);
```

#### Funkcionális Teszt:

1. Töltse ki a kapcsolati űrlapot
2. Küldje el a tesztüzenetet
3. Ellenőrizze az email beérkezését
4. Nézze meg a browser console-t hibákért

---

## Támogatás

- **Részletes útmutató**: `EmailJS_Setup_Guide.md`
- **Példa konfiguráció**: `js/email-config-production.example.js`
- **EmailJS dokumentáció**: [docs.emailjs.com](https://www.emailjs.com/docs/)

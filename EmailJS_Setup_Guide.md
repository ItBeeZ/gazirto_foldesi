# EmailJS Beállítási Útmutató

## Áttekintés

Ez az útmutató segít beállítani az EmailJS szolgáltatást a kapcsolati űrlap működéséhez. Az EmailJS lehetővé teszi, hogy közvetlenül a böngészőből küldjön emaileket backend szerver nélkül.

## 1. EmailJS Fiók Létrehozása

1. Látogasson el a [EmailJS weboldalra](https://www.emailjs.com/)
2. Kattintson a "Sign Up" gombra
3. Hozzon létre egy ingyenes fiókot
4. Erősítse meg az email címét

## 2. Email Szolgáltatás Beállítása

1. Jelentkezzen be az EmailJS Dashboard-ba
2. Kattintson az "Email Services" menüpontra
3. Kattintson az "Add New Service" gombra
4. Válassza ki az email szolgáltatóját (pl. Gmail, Outlook, Yahoo)
5. Kövesse az utasításokat a szolgáltatás beállításához
6. **Fontos**: Jegyezze fel a **Service ID**-t!

### Gmail beállítás példa:

- Válassza a "Gmail" opciót
- Adja meg a Gmail címét
- Engedélyezze a "Less secure app access"-t vagy használjon App Password-öt
- Tesztelje a kapcsolatot

## 3. Email Template Létrehozása

1. Kattintson az "Email Templates" menüpontra
2. Kattintson a "Create New Template" gombra
3. Adjon nevet a template-nek (pl. "Contact Form")
4. Állítsa be a következő mezőket:

### Template beállítások:

**Subject (Tárgy):**

```
Új üzenet a weboldalról - {{from_name}}
```

**Content (Tartalom):**

```
Új üzenet érkezett a weboldalról:

Feladó neve: {{from_name}}
Email cím: {{from_email}}
Telefon: {{phone}}
Szolgáltatás: {{service}}

Üzenet:
{{message}}

---
Ez az üzenet automatikusan lett küldve a weboldal kapcsolati űrlapjából.
```

**To Email:**

```
gazirtokertesz@gmail.com
```

**From Name:**

```
{{from_name}}
```

**Reply To:**

```
{{from_email}}
```

5. Mentse el a template-et
6. **Fontos**: Jegyezze fel a **Template ID**-t!

## 4. Public Key Megszerzése

1. Kattintson az "Account" menüpontra
2. Keresse meg a "Public Key" részt
3. **Fontos**: Jegyezze fel a **Public Key**-t!

## 5. Biztonságos Konfiguráció Beállítása

### FONTOS: Éles Környezet Biztonsága

Éles környezetben **SOHA** ne tárolja az API kulcsokat közvetlenül a kódban! Használja az alábbi biztonságos módszerek egyikét:

### Módszer A: Környezeti Változók (.env fájl)

1. Töltse ki a `.env` fájlt a valódi értékekkel:

```env
EMAILJS_PUBLIC_KEY=user_1a2b3c4d5e6f7g8h9i0j
EMAILJS_SERVICE_ID=service_abc123
EMAILJS_TEMPLATE_ID=template_xyz789
```

2. **FONTOS**: Adja hozzá a `.env` fájlt a `.gitignore`-hoz!

### Módszer B: Fejlesztési Környezet (localStorage)

1. Nyissa meg a böngésző Developer Tools konzolját
2. Futtassa a következő parancsot:

```javascript
setDevelopmentConfig(
  "user_1a2b3c4d5e6f7g8h9i0j", // Public Key
  "service_abc123", // Service ID
  "template_xyz789" // Template ID
);
```

### Módszer C: Szerver Oldali Konfiguráció (Ajánlott éles környezetben)

1. A szerver oldali script állítsa be a konfigurációt:

```html
<script>
  window.EMAILJS_CONFIG = {
    publicKey: '<?php echo $_ENV["EMAILJS_PUBLIC_KEY"]; ?>',
    serviceId: '<?php echo $_ENV["EMAILJS_SERVICE_ID"]; ?>',
    templateId: '<?php echo $_ENV["EMAILJS_TEMPLATE_ID"]; ?>',
  };
</script>
```

### Konfiguráció Ellenőrzése

A böngésző konzolján ellenőrizheti a konfigurációt:

```javascript
console.log(getSecureEmailConfig());
```

## 6. Tesztelés

1. Mentse el a módosításokat
2. Nyissa meg a weboldalt böngészőben
3. Navigáljon a Kapcsolat oldalra
4. Töltse ki az űrlapot
5. Kattintson a "Üzenet Küldése" gombra
6. Ellenőrizze, hogy megkapta-e az emailt

## 7. Hibaelhárítás

### Gyakori problémák:

**"EmailJS nincs betöltve" hiba:**

- Ellenőrizze az internetkapcsolatot
- Győződjön meg róla, hogy a script betöltődött

**"Hitelesítési hiba":**

- Ellenőrizze a Public Key-t
- Ellenőrizze a Service ID-t
- Győződjön meg róla, hogy az email szolgáltatás aktív

**"Template not found":**

- Ellenőrizze a Template ID-t
- Győződjön meg róla, hogy a template publikálva van

**"Túl sok kérés":**

- Várjon 1 percet két email között
- Maximum 3 próbálkozás session-ként

### Debug információk:

- Nyissa meg a böngésző Developer Tools-t (F12)
- Nézze meg a Console fület hibaüzenetekért
- Ellenőrizze a Network fület a kérések állapotáért

## 8. Biztonsági Megjegyzések

### Kulcskezelés:

- A Public Key biztonságosan megosztható (publikus)
- Soha ne ossza meg a Private Key-t
- **SOHA** ne commitolja az API kulcsokat a verziókezelőbe
- Használjon `.gitignore` fájlt a `.env` fájl kizárásához

### Védelem:

- Az EmailJS automatikusan véd a spam és bot támadások ellen
- Rate limiting van beépítve a visszaélések megelőzésére
- Headless böngészők blokkolása
- Email formátum validáció

### Éles Környezet:

- Használjon HTTPS protokollt
- Környezeti változók használata ajánlott
- Rendszeres monitoring az EmailJS dashboard-on
- Backup email elérhetőségek biztosítása

### Fejlesztési vs. Éles Környezet:

- Fejlesztésben: localStorage vagy .env fájl
- Éles környezetben: szerver oldali konfiguráció
- Külön EmailJS service-ek használata ajánlott

## 9. Korlátok (Ingyenes Csomag)

- 200 email/hónap
- 2 email szolgáltatás
- 1 template
- Alapvető támogatás

## 10. Támogatás

Ha problémába ütközik:

1. Ellenőrizze ezt az útmutatót
2. Nézze meg az [EmailJS dokumentációt](https://www.emailjs.com/docs/)
3. Ellenőrizze a böngésző konzolt hibaüzenetekért
4. Vegye fel a kapcsolatot az EmailJS támogatással

---

**Utolsó frissítés:** 2024. december
**Verzió:** 1.0
